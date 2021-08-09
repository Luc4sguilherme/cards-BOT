import chatMessage from '../../../components/chatMessage.js';
import {
  getGemsByAmount,
  getUserSteamInventory,
} from '../../../components/inventory.js';
import log from '../../../components/log.js';
import makeOffer from '../../../components/makeOffer.js';
import { client } from '../../../components/steamClient.js';
import messages from '../../../config/messages.js';
import prices from '../../../config/rates.js';

export default async (sender) => {
  try {
    log.userChat(sender.getSteamID64(), `[ !SELLCARDS ]`);
    chatMessage(sender, messages.request);

    const { regularCards } = await getUserSteamInventory(sender.getSteamID64());
    const cards = [];
    let amountOfGems = 0;

    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < regularCards.marketable[i].length; j += 1) {
        cards.push(regularCards.marketable[i][j]);
        amountOfGems += prices.gems[i].regularCards.marketable;
      }

      for (let j = 0; j < regularCards.nomarketable[i].length; j += 1) {
        cards.push(regularCards.nomarketable[i][j]);
        amountOfGems += prices.gems[i].regularCards.nomarketable;
      }
    }

    if (cards.length === 0) {
      chatMessage(sender.getSteamID64(), messages.error.outofstock.cards.them);
      return;
    }

    const gems = await getGemsByAmount(
      client.steamID.getSteamID64(),
      amountOfGems
    );

    const message = messages.trade.message.cards[1]
      .replace('{CARDS}', cards.length)
      .replace('{GEMS}', amountOfGems);

    await makeOffer(
      sender.getSteamID64(),
      [...gems],
      [...cards],
      '!SELLCARDS',
      message,
      cards.length,
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
