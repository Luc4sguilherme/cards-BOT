import calculatePrices from '../../../../components/calculatePrices.js';
import chatMessage from '../../../../components/chatMessage.js';
import {
  getGemsByAmount,
  getUserSteamInventory,
  stock,
} from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import { client } from '../../../../components/steamClient.js';
import messages from '../../../../config/messages.js';

export default async (sender, currency) => {
  try {
    log.userChat(sender.getSteamID64(), `[ !SELLALL ${currency} ]`);
    chatMessage(sender, messages.request);

    const { regularCards, foilCards, boosterPacks } =
      await getUserSteamInventory(sender.getSteamID64());

    const cards = [];
    const foils = [];
    const packs = [];
    let totalCost = 0;

    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < regularCards.marketable[i].length; j += 1) {
        totalCost += calculatePrices(i, 'GEMS', 'CARDS', true);
      }

      for (let j = 0; j < regularCards.nomarketable[i].length; j += 1) {
        totalCost += calculatePrices(i, 'GEMS', 'CARDS', false);
      }

      for (let j = 0; j < foilCards.marketable[i].length; j += 1) {
        totalCost += calculatePrices(i, 'GEMS', 'FOILS', true);
      }

      for (let j = 0; j < foilCards.nomarketable[i].length; j += 1) {
        totalCost += calculatePrices(i, 'GEMS', 'FOILS', false);
      }

      for (let j = 0; j < boosterPacks.marketable[i].length; j += 1) {
        totalCost += calculatePrices(i, 'GEMS', 'PACKS', true);
      }

      for (let j = 0; j < boosterPacks.nomarketable[i].length; j += 1) {
        totalCost += calculatePrices(i, 'GEMS', 'PACKS', false);
      }
    }

    if (stock.gems.tradable > 0) {
      if (totalCost > stock.gems.tradable) {
        totalCost = stock.gems.tradable;
      }
    }

    let amountOfGems = 0;
    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < regularCards.marketable[i].length; j += 1) {
        const price = calculatePrices(i, 'GEMS', 'CARDS', true);

        if (totalCost >= price) {
          cards.push(regularCards.marketable[i][j]);
          totalCost -= price;
          amountOfGems += price;
        } else {
          break;
        }
      }

      for (let j = 0; j < regularCards.nomarketable[i].length; j += 1) {
        const price = calculatePrices(i, 'GEMS', 'CARDS', false);

        if (totalCost >= price) {
          cards.push(regularCards.nomarketable[i][j]);
          totalCost -= price;
          amountOfGems += price;
        } else {
          break;
        }
      }

      for (let j = 0; j < foilCards.marketable[i].length; j += 1) {
        const price = calculatePrices(i, 'GEMS', 'FOILS', true);

        if (totalCost >= price) {
          foils.push(foilCards.marketable[i][j]);
          totalCost -= price;
          amountOfGems += price;
        } else {
          break;
        }
      }

      for (let j = 0; j < foilCards.nomarketable[i].length; j += 1) {
        const price = calculatePrices(i, 'GEMS', 'FOILS', false);

        if (totalCost >= price) {
          foils.push(foilCards.nomarketable[i][j]);
          totalCost -= price;
          amountOfGems += price;
        } else {
          break;
        }
      }

      for (let j = 0; j < boosterPacks.marketable[i].length; j += 1) {
        const price = calculatePrices(i, 'GEMS', 'PACKS', true);

        if (totalCost >= price) {
          packs.push(boosterPacks.marketable[i][j]);
          totalCost -= price;
          amountOfGems += price;
        } else {
          break;
        }
      }

      for (let j = 0; j < boosterPacks.nomarketable[i].length; j += 1) {
        const price = calculatePrices(i, 'GEMS', 'PACKS', false);

        if (totalCost >= price) {
          packs.push(boosterPacks.nomarketable[i][j]);
          totalCost -= price;
          amountOfGems += price;
        } else {
          break;
        }
      }
    }

    if (cards.length === 0 && foils.length === 0 && packs.length === 0) {
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
      [...cards, ...foils, ...packs],
      '!SELLALL',
      message,
      cards.length,
      foils.length,
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
