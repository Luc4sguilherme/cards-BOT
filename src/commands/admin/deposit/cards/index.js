import chatMessage from '../../../../components/chatMessage.js';
import { getRegularCardsByAmount } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import messages from '../../../../config/messages.js';

export default async (sender, msg) => {
  try {
    const input = msg.toUpperCase().replace(/>/g, '').replace(/</g, '');
    const amountOfCards = parseInt(input.replace('!DEPOSITCARDS ', ''), 10);

    if (Number.isNaN(amountOfCards) || amountOfCards <= 0) {
      chatMessage(
        sender,
        messages.error.inputinvalid.cards.replace(
          '{command}',
          `!DEPOSITCARDS 1`
        )
      );
      return;
    }

    chatMessage(sender, messages.request);
    log.adminChat(sender.getSteamID64(), `[ !DEPOSITCARDS ${amountOfCards} ]`);

    const cards = await getRegularCardsByAmount(
      sender.getSteamID64(),
      amountOfCards
    );

    const message = messages.trade.message.cards[0].replace(
      '{CARDS}',
      cards.length
    );

    await makeOffer(
      sender.getSteamID64(),
      [],
      cards,
      '!DEPOSITCARDS',
      message,
      cards.length,
      0,
      0,
      0
    );
  } catch (error) {
    if (error.message.includes('Insufficient number of regular card(s)')) {
      chatMessage(sender, messages.error.outofstock.cards.them);
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
