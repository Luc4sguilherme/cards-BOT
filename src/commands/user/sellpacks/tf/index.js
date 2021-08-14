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
    log.userChat(sender.getSteamID64(), `[ !SELLPACKS ${currency} ]`);
    chatMessage(sender, messages.request);

    const { boosterPacks } = await getUserSteamInventory(sender.getSteamID64());
    const packs = [];
    let totalCost = 0;

    for (let i = 5; i <= 15; i += 1) {
      totalCost +=
        boosterPacks.marketable[i].length /
        calculatePrices(i, 'TF2', 'PACKS', true);

      totalCost +=
        boosterPacks.nomarketable[i].length /
        calculatePrices(i, 'TF2', 'PACKS', false);
    }

    totalCost = Number.parseInt(totalCost, 10);

    if (stock.tf.tradable > 0) {
      if (totalCost > stock.tf.tradable) {
        totalCost = stock.tf.tradable;
      }
    }
    const amountOfKeys = totalCost;

    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < boosterPacks.marketable[i].length; j += 1) {
        const numberOfDigits = String(
          calculatePrices(i, 'TF2', 'PACKS', true)
        ).length;

        if (totalCost.toFixed(numberOfDigits) > 0) {
          packs.push(boosterPacks.marketable[i][j]);
          totalCost -= 1 / calculatePrices(i, 'TF2', 'PACKS', true);
        } else {
          break;
        }
      }

      for (let j = 0; j < boosterPacks.nomarketable[i].length; j += 1) {
        const numberOfDigits = String(
          calculatePrices(i, 'TF2', 'PACKS', false)
        ).length;

        if (totalCost.toFixed(numberOfDigits) > 0) {
          packs.push(boosterPacks.nomarketable[i][j]);

          totalCost -= 1 / calculatePrices(i, 'TF2', 'PACKS', false);
        } else {
          break;
        }
      }
    }

    if (amountOfKeys === 0 || packs.length === 0) {
      chatMessage(sender.getSteamID64(), messages.error.outofstock.packs.them);
      return;
    }

    const keys = await getTF2KeyByAmount(
      client.steamID.getSteamID64(),
      amountOfKeys
    );

    const message = messages.trade.message.packs[2]
      .replace('{PACKS}', packs.length)
      .replace('{KEYS}', amountOfKeys);

    await makeOffer(
      sender.getSteamID64(),
      [...keys],
      [...packs],
      '!SELLPACKS',
      message,
      0,
      amountOfKeys,
      0,
      packs.length
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
