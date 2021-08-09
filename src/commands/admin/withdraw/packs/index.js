import chatMessage from '../../../../components/chatMessage.js';
import { getBoosterPackByAmount } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import { client } from '../../../../components/steamClient.js';
import messages from '../../../../config/messages.js';

export default async (sender, msg) => {
  try {
    const input = msg.toUpperCase();
    const amountOfPacks = parseInt(input.replace('!WITHDRAWPACKS ', ''), 10);

    if (Number.isNaN(amountOfPacks) && amountOfPacks < 0) {
      chatMessage(
        sender,
        messages.error.inputinvalid.packs.replace(
          '{command}',
          `!WITHDRAWPACKS 1`
        )
      );
      return;
    }

    chatMessage(sender, messages.request);
    log.adminChat(sender.getSteamID64(), `[ !WITHDRAWPACKS ${amountOfPacks} ]`);

    const packs = await getBoosterPackByAmount(
      client.steamID.getSteamID64(),
      amountOfPacks
    );

    const message = messages.trade.message.packs[0].replace(
      '{PACKS}',
      packs.length
    );

    await makeOffer(
      sender.getSteamID64(),
      packs,
      [],
      '!WITHDRAWPACKS',
      message,
      0,
      0,
      0,
      amountOfPacks
    );
  } catch (error) {
    if (error.message.includes('Insufficient number of booster Pack(s)')) {
      chatMessage(sender, messages.error.outofstock.packs.me);
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
