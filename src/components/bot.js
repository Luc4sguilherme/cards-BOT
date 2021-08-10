import moment from 'moment';
import SteamTotp from 'steam-totp';
import SteamUser from 'steam-user';

import commands from '../commands/index.js';
import main from '../config/main.js';
import messages from '../config/messages.js';
import acceptFriendRequests from './acceptFriendRequests.js';
import addFriend from './addFriend.js';
import chatMessage from './chatMessage.js';
import { loadInventory, updateStock } from './inventory.js';
import inviteToGroup from './inviteToGroup.js';
import isLoadingInventory from './isLoadingInventory.js';
import log from './log.js';
import notifyAdmin from './notifyAdmin.js';
import refuseGroupInvites from './refuseGroupInvites.js';
import { client, community, manager } from './steamClient.js';
import userInactivityVerify from './userInactivityVerify.js';
import { registerDateMsg } from './userLocalInfos.js';
import userSpamVerify, { isSpam } from './userSpamVerify.js';

export default {
  initialize() {
    userInactivityVerify();
    userSpamVerify();

    client.logOn({
      accountName: main.userName,
      password: main.passWord,
      twoFactorCode: SteamTotp.getAuthCode(main.sharedSecret),
      identity_secret: main.identitySecret,
      rememberPassword: true,
      shared_secret: main.sharedSecret,
    });

    client.on('loggedOn', () => {
      if (main.botName) {
        client.setPersona(SteamUser.EPersonaState.Online, main.botName);
      } else {
        client.setPersona(SteamUser.EPersonaState.Online);
      }
    });

    client.on('webSession', async (value, cookies) => {
      manager.setCookies(cookies, (error) => {
        if (error) {
          log.error('An error occurred while setting cookies.');
        } else {
          log.info('Websession created and cookies set.');
        }
      });

      community.setCookies(cookies);
      community.startConfirmationChecker(
        moment.duration(20, 'seconds'),
        main.identitySecret
      );

      await loadInventory(['TF2', 'GEMS']);
      await acceptFriendRequests();
      refuseGroupInvites();
    });

    client.on('error', (error) => {
      const minutes = 25;
      const seconds = 5;

      switch (error.eresult) {
        case SteamUser.EResult.AccountDisabled:
          log.error(`This account is disabled!`);
          break;
        case SteamUser.EResult.InvalidPassword:
          log.error(`Invalid Password detected!`);
          break;
        case SteamUser.EResult.RateLimitExceeded:
          log.warn(
            `Rate Limit Exceeded, trying to login again in ${minutes} minutes.`
          );
          setTimeout(() => {
            client.relog();
          }, moment.duration(minutes, 'minutes'));
          break;
        case SteamUser.EResult.LogonSessionReplaced:
          log.warn(
            `Unexpected Disconnection!, you have LoggedIn with this same account in another place. Trying to login again in ${seconds} seconds.`
          );
          setTimeout(() => {
            client.relog();
          }, moment.duration(seconds, 'seconds'));
          break;
        default:
          log.warn(
            `Unexpected Disconnection!, trying to login again in ${seconds} seconds.`
          );
          setTimeout(() => {
            client.relog();
          }, moment.duration(seconds, 'seconds'));
          break;
      }
    });

    client.on('newItems', (count) => {
      log.info(`We have ${count} new Items in our Inventory`);
    });

    client.on('emailInfo', (address) => {
      log.info(`E-Mail: ${address}`);
    });

    client.on(
      'accountLimitations',
      (limited, communityBanned, locked, canInviteFriends) => {
        if (limited) {
          log.info(
            'Account is limited. Cannot send friend invites, use the market, open group chat, or access the web API.'
          );
          client.logOff();
        }
        if (communityBanned) {
          log.info('Account is banned from Steam Community');
          client.logOff();
        }
        if (locked) {
          log.info(
            'Account is locked. We cannot trade/gift/purchase items, play on VAC servers, or access Steam Community.  Shutting down.'
          );
          client.logOff();
          // eslint-disable-next-line no-process-exit
          process.exit(1);
        }
        if (!canInviteFriends) {
          log.info('Account is unable to send friend requests.');
          client.logOff();
        }
      }
    );

    client.on('wallet', (hasWallet, currency, balance) => {
      if (hasWallet) {
        log.info(
          `Wallet: ${SteamUser.formatCurrency(
            balance,
            currency
          )} Steam Credit remaining`
        );
      } else {
        log.info('We do not have a Steam wallet.');
      }
    });

    client.on('friendMessage', async (sender, msg) => {
      try {
        await registerDateMsg(sender.getSteamID64());

        if (isSpam(sender.getSteamID64())) {
          return;
        }

        if (client.myFriends[sender.getSteamID64()] === 5) {
          chatMessage(sender, 'You have been banned from using our services');
          return;
        }

        if (client.myFriends[sender.getSteamID64()] === undefined) {
          chatMessage(sender, 'You need to add me as a friend');
          return;
        }

        if (msg.indexOf('[/tradeoffer]') >= 0) {
          chatMessage(sender, messages.request);
          return;
        }

        if (isLoadingInventory(msg)) {
          chatMessage(sender, messages.loading);
          return;
        }

        commands(sender, msg);
      } catch (error) {
        log.error(error.message);
      }
    });

    client.on('friendRelationship', (sender, rel) => {
      if (rel === 0) {
        log.info(
          `User ID: ${sender.getSteamID64()} has deleted us from their friendlist.`
        );
      }

      if (rel === 2) {
        addFriend(sender.getSteamID64());
      }

      if (rel === 3) {
        if (main.steamGroup.ID && main.steamGroup.doInvites) {
          inviteToGroup(sender.getSteamID64());
        }

        chatMessage(sender.getSteamID64(), messages.welcome);
      }
    });

    manager.on('newOffer', (offer) => {
      if (main.admins.includes(offer.partner.getSteamID64())) {
        offer.getUserDetails((error1, me, them) => {
          if (error1) {
            log.error(`An error occurred while getting trade holds: ${error1}`);
            chatMessage(offer.partner, messages.error.tradehold);
            offer.decline((error2) => {
              if (error2) {
                log.error(`An error occurred while declining trade: ${error2}`);
              }
            });
          } else if (me.escrowDays === 0 && them.escrowDays === 0) {
            offer.accept((error3) => {
              if (error3) {
                log.error(`An error occurred while accepting trade: ${error3}`);
                offer.decline((error4) => {
                  if (error4) {
                    log.error(
                      `An error occurred while accepting trade: ${error4}`
                    );
                  }
                });
              } else {
                chatMessage(
                  offer.partner,
                  messages.trade.accepted.replace('{OFFERID}', offer.id)
                );
              }
            });
          } else {
            chatMessage(offer.partner, messages.tradeHold);
            offer.decline((error5) => {
              if (error5) {
                log.error(`An error occurred while declining trade: ${error5}`);
              }
            });
          }
        });
      } else {
        offer.decline((error) => {
          if (error) {
            log.error(`An error occurred while declining trade: ${error}`);
          } else {
            chatMessage(
              offer.partner,
              messages.trade.declined.us.replace('{OFFERID}', offer.id)
            );
          }
        });
      }
    });

    manager.on('sentOfferChanged', async (offer) => {
      if (offer.state === 2) {
        log.tradeoffer(
          `Tradeoffer has been confirmed and is awaiting confirmation from User. TradeID:${offer.id}`
        );
      } else if (offer.state === 3) {
        log.tradeoffer(`Tradeoffer has been completed. TradeID:${offer.id}`);

        if (main.admins.includes(offer.partner.getSteamID64())) {
          chatMessage(offer.partner.getSteamID64(), messages.trade.done[0]);
        } else {
          chatMessage(offer.partner.getSteamID64(), messages.trade.done[1]);

          notifyAdmin(offer);
        }

        updateStock(offer);
      } else if (offer.state === 4) {
        log.tradeoffer(`Aborted because of counter offer. TradeID:${offer.id}`);
        chatMessage(
          offer.partner,
          messages.trade.counteroffer.replace('{OFFERID}', offer.id)
        );
      } else if (offer.state === 5) {
        log.tradeoffer(`Tradeoffer expired. TradeID:${offer.id}`);
        chatMessage(
          offer.partner,
          messages.trade.expired.replace('{OFFERID}', offer.id)
        );
      } else if (offer.state === 6) {
        log.tradeoffer(`Trade offer canceled by bot. TradeID:${offer.id}`);
        chatMessage(
          offer.partner,
          messages.trade.canceled[0].replace('{OFFERID}', offer.id)
        );
      } else if (offer.state === 7 || offer.state === 10) {
        log.tradeoffer(`Tradeoffer declined by user. TradeID:${offer.id}`);
        chatMessage(
          offer.partner,
          messages.trade.declined.them.replace('{OFFERID}', offer.id)
        );
      } else if (offer.state === 8) {
        log.tradeoffer(
          `Tradeoffer canceled by steam (items unavailable). TradeID:${offer.id}`
        );
        chatMessage(
          offer.partner,
          messages.trade.canceled[1].replace('{OFFERID}', offer.id)
        );
      } else if (offer.state === 11) {
        log.tradeoffer(
          `Tradeoffer aborted because user is in escrow and can't trade. TradeID:${offer.id}`
        );
        chatMessage(
          offer.partner,
          messages.trade.escrow.replace('{OFFERID}', offer.id)
        );
      }
    });

    community.on('newConfirmation', (conf) => {
      log.tradeoffer('New confirmation.');
      community.acceptConfirmationForObject(
        main.identitySecret,
        conf.id,
        (error) => {
          if (error) {
            log.error(
              `An error occurred while accepting confirmation: ${error}`
            );
          } else {
            log.tradeoffer('Confirmation accepted.');
          }
        }
      );
    });
  },
};
