/* eslint-disable eqeqeq */
import chatMessage from '../../../../components/chatMessage.js';
import {
  getTF2KeyByAmount,
  getUserSteamInventory,
} from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import { client } from '../../../../components/steamClient.js';
import messages from '../../../../config/messages.js';
import prices from '../../../../config/rates.js';

export default async (sender, currency) => {
  try {
    log.userChat(sender.getSteamID64(), `[ !SELLCARDS ${currency} ]`);
    chatMessage(sender, messages.request);

    const { regularCards } = await getUserSteamInventory(sender.getSteamID64());
    const cards = [];
    let amountOfKeys = 0;

    for (let i = 5; i <= 15; i += 1) {
      amountOfKeys +=
        regularCards.marketable[i].length /
        prices.tf[i].regularCards.marketable;

      amountOfKeys +=
        regularCards.nomarketable[i].length /
        prices.tf[i].regularCards.nomarketable;
    }

    amountOfKeys = Number.parseInt(amountOfKeys, 10);

    let need = amountOfKeys;
    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < regularCards.marketable[i].length; j += 1) {
        const numberOfDigits = String(
          prices.tf[i].regularCards.marketable
        ).length;

        if (need.toFixed(numberOfDigits) > 0) {
          cards.push(regularCards.marketable[i][j]);
          need -= 1 / prices.tf[i].regularCards.marketable;
        } else {
          break;
        }
      }

      for (let j = 0; j < regularCards.nomarketable[i].length; j += 1) {
        const numberOfDigits = String(
          prices.tf[i].regularCards.nomarketable
        ).length;

        if (need.toFixed(numberOfDigits) > 0) {
          cards.push(regularCards.nomarketable[i][j]);

          need -= 1 / prices.tf[i].regularCards.nomarketable;
        } else {
          break;
        }
      }
    }

    if (amountOfKeys === 0 || cards.length === 0) {
      chatMessage(sender.getSteamID64(), messages.error.outofstock.cards.them);
      return;
    }

    const keys = await getTF2KeyByAmount(
      client.steamID.getSteamID64(),
      amountOfKeys
    );

    const message = messages.trade.message.cards[2]
      .replace('{CARDS}', cards.length)
      .replace('{KEYS}', amountOfKeys);

    await makeOffer(
      sender.getSteamID64(),
      [...keys],
      [...cards],
      '!SELLCARDS',
      message,
      cards.length,
      amountOfKeys,
      0,
      0
    );
  } catch (error) {
    if (error.message.includes('Insufficient number of key(s)')) {
      chatMessage(sender, messages.error.outofstock.keys.me);
    } else if (
      error.message.includes('An error occurred while getting trade holds')
    ) {
      chatMessage(sender, messages.error.tradehold);
      log.error(
        `An error occurred while getting trade holds: ${error.message}`
      );
    } else if (error.message.indexOf('There is a trade holds') > -1) {
      chatMessage(sender, messages.tradeHold);
      log.error(`There is a trade holds: ${error.message}`);
    } else {
      log.error(
        `An error occurred while sending trade offer: ${error.message}`
      );
      chatMessage(sender, messages.error.sendtrade);
    }
  }
};
