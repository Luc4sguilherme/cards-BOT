import chatMessage from '../../../../components/chatMessage.js';
import { getTF2KeyByAmount } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import { client } from '../../../../components/steamClient.js';
import messages from '../../../../config/messages.js';

export default async (sender, msg) => {
  try {
    const input = msg.toUpperCase();
    const amountOfKeys = parseInt(input.replace('!WITHDRAWTF ', ''), 10);

    if (Number.isNaN(amountOfKeys) && amountOfKeys < 0) {
      chatMessage(
        sender,
        messages.error.inputinvalid.keys.replace('{command}', `!WITHDRAWTF 1`)
      );
      return;
    }

    chatMessage(sender, messages.request);
    log.adminChat(sender.getSteamID64(), `[ !WITHDRAWTF ${amountOfKeys} ]`);

    const keys = await getTF2KeyByAmount(
      client.steamID.getSteamID64(),
      amountOfKeys
    );

    const message = messages.trade.message.keys[0].replace(
      '{KEYS}',
      keys.length
    );

    await makeOffer(
      sender.getSteamID64(),
      keys,
      [],
      '!WITHDRAWTF',
      message,
      0,
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
      log.error(error.message);
    } else if (
      error.message.includes('An error occurred while sending trade offer')
    ) {
      chatMessage(sender, messages.error.sendtrade);
      log.error(error.message);
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
