import chatMessage from '../../../../components/chatMessage.js';
import { getFoilCardsByAmount } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import { client } from '../../../../components/steamClient.js';
import messages from '../../../../config/messages.js';

export default async (sender, msg) => {
  try {
    const input = msg.toUpperCase().replace(/>/g, '').replace(/</g, '');
    const amountOfCards = parseInt(input.replace('!WITHDRAWFOILS ', ''), 10);

    if (Number.isNaN(amountOfCards) || amountOfCards <= 0) {
      chatMessage(
        sender,
        messages.error.inputinvalid.foils.replace(
          '{command}',
          `!WITHDRAWFOILS 1`
        )
      );
      return;
    }

    chatMessage(sender, messages.request);
    log.adminChat(sender.getSteamID64(), `[ !WITHDRAWFOILS ${amountOfCards} ]`);

    const foils = await getFoilCardsByAmount(
      client.steamID.getSteamID64(),
      amountOfCards
    );

    const message = messages.trade.message.cards[0].replace(
      '{CARDS}',
      foils.length
    );

    await makeOffer(
      sender.getSteamID64(),
      foils,
      [],
      '!WITHDRAWFOILS',
      message,
      0,
      foils.length,
      0,
      0,
      0
    );
  } catch (error) {
    if (error.message.includes('Insufficient number of foil card(s)')) {
      chatMessage(sender, messages.error.outofstock.foils.me);
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
