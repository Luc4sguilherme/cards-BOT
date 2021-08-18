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
    log.userChat(sender.getSteamID64(), `[ !SELLFOILS ${currency} ]`);
    chatMessage(sender, messages.request);

    const { foilCards } = await getUserSteamInventory(sender.getSteamID64());
    const foils = [];
    let totalCost = 0;

    for (let i = 5; i <= 15; i += 1) {
      totalCost +=
        foilCards.marketable[i].length /
        calculatePrices(i, 'TF2', 'FOILS', true);

      totalCost +=
        foilCards.nomarketable[i].length /
        calculatePrices(i, 'TF2', 'FOILS', false);
    }

    totalCost = Number.parseInt(totalCost, 10);

    if (stock.tf.tradable > 0) {
      if (totalCost > stock.tf.tradable) {
        totalCost = stock.tf.tradable;
      }
    }

    const amountOfKeys = totalCost;

    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < foilCards.marketable[i].length; j += 1) {
        const price = calculatePrices(i, 'TF2', 'FOILS', true);
        const numberOfDigits = String(price).length;

        if (totalCost.toFixed(numberOfDigits) > 0) {
          foils.push(foilCards.marketable[i][j]);
          totalCost -= 1 / price;
        } else {
          break;
        }
      }

      for (let j = 0; j < foilCards.nomarketable[i].length; j += 1) {
        const price = calculatePrices(i, 'TF2', 'FOILS', false);
        const numberOfDigits = String(price).length;

        if (totalCost.toFixed(numberOfDigits) > 0) {
          foils.push(foilCards.nomarketable[i][j]);

          totalCost -= 1 / price;
        } else {
          break;
        }
      }
    }

    if (amountOfKeys === 0 || foils.length === 0) {
      chatMessage(sender.getSteamID64(), messages.error.outofstock.foils.them);
      return;
    }

    const keys = await getTF2KeyByAmount(
      client.steamID.getSteamID64(),
      amountOfKeys
    );

    const message = messages.trade.message.cards[2]
      .replace('{CARDS}', foils.length)
      .replace('{KEYS}', amountOfKeys);

    await makeOffer(
      sender.getSteamID64(),
      [...keys],
      [...foils],
      '!SELLFOILS',
      message,
      0,
      foils.length,
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
