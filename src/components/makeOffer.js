import messages from '../config/messages.js';
import chatMessage from './chatMessage.js';
import log from './log.js';
import { manager } from './steamClient.js';

export default (
  target,
  itemsFromMe,
  itemsFromThem,
  commandused,
  message,
  amountofcards = 0,
  amountoffoils = 0,
  amountofkeys = 0,
  amountofgems = 0,
  amountofpacks = 0
) =>
  new Promise((resolve, reject) => {
    const offer = manager.createOffer(target);

    offer.addMyItems(itemsFromMe);
    offer.addTheirItems(itemsFromThem);

    log.tradeoffer('Creating trade offer');

    offer.data('commandused', commandused);

    if (amountofcards) {
      offer.data('amountofcards', amountofcards);
    }

    if (amountoffoils) {
      offer.data('amountoffoils', amountoffoils);
    }

    if (amountofkeys) {
      offer.data('amountofkeys', amountofkeys);
    }

    if (amountofgems) {
      offer.data('amountofgems', amountofgems);
    }

    if (amountofpacks) {
      offer.data('amountofpacks', amountofpacks);
    }

    offer.setMessage(message);
    offer.getUserDetails((error1, me, them) => {
      if (error1) {
        reject(
          new Error(`An error occurred while getting trade holds: ${error1}`)
        );
      } else if (me.escrowDays === 0 && them.escrowDays === 0) {
        log.tradeoffer('Sending trade offer');
        offer.send((error2) => {
          if (error2) {
            reject(
              new Error(
                `An error occurred while sending trade offer: ${error2}`
              )
            );
          } else {
            chatMessage(target, `${messages.trade.check} \n\n`);
            log.tradeoffer(
              `offer #${offer.id} sent successfully to user #${target}`
            );
            resolve();
          }
        });
      } else {
        reject(new Error(`There is a trade holds`));
      }
    });
  });
