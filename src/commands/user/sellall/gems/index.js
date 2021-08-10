import chatMessage from '../../../../components/chatMessage.js';
import {
  getGemsByAmount,
  getUserSteamInventory,
} from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import { client } from '../../../../components/steamClient.js';
import messages from '../../../../config/messages.js';
import prices from '../../../../config/rates.js';

export default async (sender, currency) => {
  try {
    log.userChat(sender.getSteamID64(), `[ !SELLALL ${currency} ]`);
    chatMessage(sender, messages.request);

    const { regularCards, foilCards, boosterPacks } =
      await getUserSteamInventory(sender.getSteamID64());

    const cards = [];
    const packs = [];
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

      for (let j = 0; j < foilCards.marketable[i].length; j += 1) {
        cards.push(foilCards.marketable[i][j]);
        amountOfGems += prices.gems[i].foilCards.marketable;
      }

      for (let j = 0; j < foilCards.nomarketable[i].length; j += 1) {
        cards.push(foilCards.nomarketable[i][j]);
        amountOfGems += prices.gems[i].foilCards.nomarketable;
      }

      for (let j = 0; j < boosterPacks.marketable[i].length; j += 1) {
        packs.push(boosterPacks.marketable[i][j]);
        amountOfGems += prices.gems[i].boosterPacks.marketable;
      }

      for (let j = 0; j < boosterPacks.nomarketable[i].length; j += 1) {
        packs.push(boosterPacks.nomarketable[i][j]);
        amountOfGems += prices.gems[i].boosterPacks.nomarketable;
      }
    }

    if (cards.length === 0 && packs.length === 0) {
      chatMessage(
        sender.getSteamID64(),
        messages.error.outofstock.anything.them
      );
      return;
    }

    const gems = await getGemsByAmount(
      client.steamID.getSteamID64(),
      amountOfGems
    );

    const message = messages.trade.message.everything[0].replace(
      '{GEMS}',
      amountOfGems
    );

    await makeOffer(
      sender.getSteamID64(),
      [...gems],
      [...cards, ...packs],
      '!SELLALL',
      message,
      cards.length,
      0,
      amountOfGems,
      packs.length
    );
  } catch (error) {
    if (error.message.includes('Insufficient number of gem(s)')) {
      chatMessage(sender, messages.error.outofstock.gems.me);
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
