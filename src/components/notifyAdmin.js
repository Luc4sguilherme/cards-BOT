import main from '../config/main.js';
import messages from '../config/messages.js';
import chatMessage from './chatMessage.js';

export default (offer) => {
  if (offer.data('commandused').search(/SELL/) !== -1) {
    if (offer.data('commandused').search(/ALL/) !== -1) {
      let message = '';

      if (offer.data('amountofpacks')) {
        message = messages.trade.notifyAdmin.all[1]
          .replace('{ID64}', offer.partner.getSteamID64())
          .replace('{GEMS}', offer.data('amountofgems'))
          .replace('{CARDS}', offer.data('amountofcards'))
          .replace('{PACKS}', offer.data('amountofpacks'))
          .replace('{OFFERID}', offer.id);
      } else {
        message = messages.trade.notifyAdmin.all[0]
          .replace('{ID64}', offer.partner.getSteamID64())
          .replace('{GEMS}', offer.data('amountofgems'))
          .replace('{CARDS}', offer.data('amountofcards'))
          .replace('{OFFERID}', offer.id);
      }

      for (let i = 0; i < main.admins.length; i += 1) {
        chatMessage(main.admins[i], message);
        chatMessage(
          main.admins[i],
          `https://steamcommunity.com/profiles/${offer.partner.getSteamID64()}`
        );
      }
    }

    if (offer.data('commandused').search(/CARDS/) !== -1) {
      const message = messages.trade.notifyAdmin.cards
        .replace('{ID64}', offer.partner.getSteamID64())
        .replace('{GEMS}', offer.data('amountofgems'))
        .replace('{CARDS}', offer.data('amountofcards'))
        .replace('{OFFERID}', offer.id);

      for (let i = 0; i < main.admins.length; i += 1) {
        chatMessage(main.admins[i], message);
        chatMessage(
          main.admins[i],
          `https://steamcommunity.com/profiles/${offer.partner.getSteamID64()}`
        );
      }
    }

    if (offer.data('commandused').search(/FOILS/) !== -1) {
      const message = messages.trade.notifyAdmin.foils
        .replace('{ID64}', offer.partner.getSteamID64())
        .replace('{GEMS}', offer.data('amountofgems'))
        .replace('{FOILS}', offer.data('amountofcards'))
        .replace('{OFFERID}', offer.id);

      for (let i = 0; i < main.admins.length; i += 1) {
        chatMessage(main.admins[i], message);
        chatMessage(
          main.admins[i],
          `https://steamcommunity.com/profiles/${offer.partner.getSteamID64()}`
        );
      }
    }

    if (offer.data('commandused').search(/PACKS/) !== -1) {
      const message = messages.trade.notifyAdmin.packs
        .replace('{ID64}', offer.partner.getSteamID64())
        .replace('{GEMS}', offer.data('amountofgems'))
        .replace('{PACKS}', offer.data('amountofpacks'))
        .replace('{OFFERID}', offer.id);

      for (let i = 0; i < main.admins.length; i += 1) {
        chatMessage(main.admins[i], message);
        chatMessage(
          main.admins[i],
          `https://steamcommunity.com/profiles/${offer.partner.getSteamID64()}`
        );
      }
    }
  }
};
