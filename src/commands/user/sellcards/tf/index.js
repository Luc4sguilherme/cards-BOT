/* eslint-disable eqeqeq */
import calculatePrices from '../../../../components/calculatePrices.js';
import chatMessage from '../../../../components/chatMessage.js';
import {
  getTF2KeyByAmount,
  getUserSteamInventory,
  stock,
} from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import makeOffer from '../../../../components/makeOffer.js';
import { client } from '../../../../components/steamClient.js';
import messages from '../../../../config/messages.js';

export default async (sender, currency) => {
  try {
    log.userChat(sender.getSteamID64(), `[ !SELLCARDS ${currency} ]`);
    chatMessage(sender, messages.request);

    const { regularCards } = await getUserSteamInventory(sender.getSteamID64());
    const cards = [];
    let totalCost = 0;

    for (let i = 5; i <= 15; i += 1) {
      totalCost +=
        regularCards.marketable[i].length /
        calculatePrices(i, 'TF2', 'CARDS', true);

      totalCost +=
        regularCards.nomarketable[i].length /
        calculatePrices(i, 'TF2', 'CARDS', false);
    }

    totalCost = Number.parseInt(totalCost, 10);

    if (stock.tf.tradable > 0) {
      if (totalCost > stock.tf.tradable) {
        totalCost = stock.tf.tradable;
      }
    }

    const amountOfKeys = totalCost;

    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < regularCards.marketable[i].length; j += 1) {
        const numberOfDigits = String(
          calculatePrices(i, 'TF2', 'CARDS', true)
        ).length;

        if (totalCost.toFixed(numberOfDigits) > 0) {
          cards.push(regularCards.marketable[i][j]);
          totalCost -= 1 / calculatePrices(i, 'TF2', 'CARDS', true);
        } else {
          break;
        }
      }

      for (let j = 0; j < regularCards.nomarketable[i].length; j += 1) {
        const numberOfDigits = String(
          calculatePrices(i, 'TF2', 'CARDS', false)
        ).length;

        if (totalCost.toFixed(numberOfDigits) > 0) {
          cards.push(regularCards.nomarketable[i][j]);

          totalCost -= 1 / calculatePrices(i, 'TF2', 'CARDS', false);
        } else {
          break;
        }
      }
    }

    if (amountOfKeys === 0 || cards.length === 0) {
      chatMessage(sender.getSteamID64(), messages.error.outofstock.cards.them);
      return;
    }

    const keys = await getTF2KeyByAmount(
      client.steamID.getSteamID64(),
      amountOfKeys
    );

    const message = messages.trade.message.cards[2]
      .replace('{CARDS}', cards.length)
      .replace('{KEYS}', amountOfKeys);

    await makeOffer(
      sender.getSteamID64(),
      [...keys],
      [...cards],
      '!SELLCARDS',
      message,
      cards.length,
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
