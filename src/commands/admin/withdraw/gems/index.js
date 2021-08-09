import chatMessage from '../../../../components/chatMessage.js';
import { getGemsByAmount } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import { client } from '../../../../components/steamClient.js';
import messages from '../../../../config/messages.js';

export default async (sender, msg) => {
  try {
    const input = msg.toUpperCase();
    const amountOfGems = parseInt(input.replace('!WITHDRAWGEMS ', ''), 10);

    if (Number.isNaN(amountOfGems) && amountOfGems < 0) {
      chatMessage(
        sender,
        messages.error.inputinvalid.gems.replace('{command}', `!WITHDRAWGEMS 1`)
      );
      return;
    }

    chatMessage(sender, messages.request);
    log.adminChat(sender.getSteamID64(), `[ !WITHDRAWGEMS ${amountOfGems} ]`);

    const gems = await getGemsByAmount(
      client.steamID.getSteamID64(),
      amountOfGems
    );

    const message = messages.trade.message.gems.replace('{GEMS}', amountOfGems);

    await makeOffer(
      sender.getSteamID64(),
      gems,
      [],
      '!WITHDRAWGEMS',
      message,
      0,
      0,
      amountOfGems,
      0
    );
  } catch (error) {
    if (error.message.includes('Insufficient number of gem(s)')) {
      chatMessage(sender, messages.error.outofstock.gems.me);
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
