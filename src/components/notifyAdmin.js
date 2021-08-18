import main from '../config/main.js';
import messages from '../config/messages.js';
import chatMessage from './chatMessage.js';

function sendMessageToAdmin(message, id64) {
  for (let i = 0; i < main.admins.length; i += 1) {
    chatMessage(main.admins[i], message);
    chatMessage(main.admins[i], `https://steamcommunity.com/profiles/${id64}`);
  }
}

export default (offer) => {
  if (offer.data('commandused')?.search(/SELL/) !== -1) {
    if (offer.data('amountofkeys') > 0) {
      if (offer.data('commandused').search(/ALL/) !== -1) {
        let message = '';
        let items = '';

        if (offer.data('amountofcards')) {
          items += `${offer.data('amountofcards')} Regular Card(s) `;
        }

        if (offer.data('amountoffoils')) {
          items += `${offer.data('amountoffoils')} Foil Card(s) `;
        }

        if (offer.data('amountofpacks')) {
          items += `${offer.data('amountofpacks')} Booster Pack(s) `;
        }

        message = messages.trade.notifyAdmin.all.tf
          .replace('{ID64}', offer.partner.getSteamID64())
          .replace('{KEYS}', offer.data('amountofkeys'))
          .replace('{ITEMS}', items)
          .replace('{OFFERID}', offer.id)
          .replace(/ {2}/g, ' ')
          .replace(/d\(s\) (?!r)/g, 'd(s), ');

        sendMessageToAdmin(message, offer.partner.getSteamID64());
      }

      if (offer.data('commandused').search(/CARDS/) !== -1) {
        const message = messages.trade.notifyAdmin.cards.tf
          .replace('{ID64}', offer.partner.getSteamID64())
          .replace('{KEYS}', offer.data('amountofkeys'))
          .replace('{CARDS}', offer.data('amountofcards'))
          .replace('{OFFERID}', offer.id);

        sendMessageToAdmin(message, offer.partner.getSteamID64());
      }

      if (offer.data('commandused').search(/FOILS/) !== -1) {
        const message = messages.trade.notifyAdmin.foils.tf
          .replace('{ID64}', offer.partner.getSteamID64())
          .replace('{KEYS}', offer.data('amountofkeys'))
          .replace('{FOILS}', offer.data('amountoffoils'))
          .replace('{OFFERID}', offer.id);

        sendMessageToAdmin(message, offer.partner.getSteamID64());
      }

      if (offer.data('commandused').search(/PACKS/) !== -1) {
        const message = messages.trade.notifyAdmin.packs.tf
          .replace('{ID64}', offer.partner.getSteamID64())
          .replace('{KEYS}', offer.data('amountofkeys'))
          .replace('{PACKS}', offer.data('amountofpacks'))
          .replace('{OFFERID}', offer.id);

        sendMessageToAdmin(message, offer.partner.getSteamID64());
      }
    }

    if (offer.data('amountofgems') > 0) {
      if (offer.data('commandused').search(/ALL/) !== -1) {
        let message = '';
        let items = '';

        if (offer.data('amountofcards')) {
          items += `${offer.data('amountofcards')} Regular Card(s) `;
        }

        if (offer.data('amountoffoils')) {
          items += `${offer.data('amountoffoils')} Foil Card(s) `;
        }

        if (offer.data('amountofpacks')) {
          items += `${offer.data('amountofpacks')} Booster Pack(s) `;
        }

        message = messages.trade.notifyAdmin.all.gems
          .replace('{ID64}', offer.partner.getSteamID64())
          .replace('{GEMS}', offer.data('amountofgems'))
          .replace('{ITEMS}', items)
          .replace('{OFFERID}', offer.id)
          .replace(/ {2}/g, ' ')
          .replace(/d\(s\) (?!r)/g, 'd(s), ');

        sendMessageToAdmin(message, offer.partner.getSteamID64());
      }

      if (offer.data('commandused').search(/CARDS/) !== -1) {
        const message = messages.trade.notifyAdmin.cards.gems
          .replace('{ID64}', offer.partner.getSteamID64())
          .replace('{GEMS}', offer.data('amountofgems'))
          .replace('{CARDS}', offer.data('amountofcards'))
          .replace('{OFFERID}', offer.id);

        sendMessageToAdmin(message, offer.partner.getSteamID64());
      }

      if (offer.data('commandused').search(/FOILS/) !== -1) {
        const message = messages.trade.notifyAdmin.foils.gems
          .replace('{ID64}', offer.partner.getSteamID64())
          .replace('{GEMS}', offer.data('amountofgems'))
          .replace('{FOILS}', offer.data('amountoffoils'))
          .replace('{OFFERID}', offer.id);

        sendMessageToAdmin(message, offer.partner.getSteamID64());
      }

      if (offer.data('commandused').search(/PACKS/) !== -1) {
        const message = messages.trade.notifyAdmin.packs.gems
          .replace('{ID64}', offer.partner.getSteamID64())
          .replace('{GEMS}', offer.data('amountofgems'))
          .replace('{PACKS}', offer.data('amountofpacks'))
          .replace('{OFFERID}', offer.id);

        sendMessageToAdmin(message, offer.partner.getSteamID64());
      }
    }
  }
};
