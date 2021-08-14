import _ from 'lodash';

import acceptedCurrencies from '../config/currencies.js';
import calculatePrices from './calculatePrices.js';
import {
  filterBoosterPack,
  filterCards,
  getBoosterPack,
  getFoilCard,
  getRegularCard,
} from './inventory.js';

const getItems = async (item) => {
  const regularCards = await getRegularCard(item);
  const foilCards = await getFoilCard(item);
  const boosterPacks = await getBoosterPack(item);
  const items = {
    regularCards: {
      marketable: {},
      nomarketable: {},
    },
    foilCards: {
      marketable: {},
      nomarketable: {},
    },
    boosterPacks: {
      marketable: {},
      nomarketable: {},
    },
  };

  for (let i = 5; i <= 15; i += 1) {
    items.regularCards.marketable[i] = await filterCards(regularCards, true, i);
    items.regularCards.nomarketable[i] = await filterCards(
      regularCards,
      false,
      i
    );
    items.foilCards.marketable[i] = await filterCards(foilCards, true, i);
    items.foilCards.nomarketable[i] = await filterCards(foilCards, false, i);
    items.boosterPacks.marketable[i] = await filterBoosterPack(
      boosterPacks,
      true,
      i
    );
    items.boosterPacks.nomarketable[i] = await filterBoosterPack(
      boosterPacks,
      false,
      i
    );
  }

  return items;
};

const calculateTotalCost = async (currency, items) => {
  const { regularCards, foilCards, boosterPacks } = await getItems(items);

  let totalCost = 0;
  if (currency === 'TF2') {
    for (let i = 5; i <= 15; i += 1) {
      totalCost +=
        regularCards.marketable[i].length /
        calculatePrices(i, currency, 'CARDS', true);

      totalCost +=
        regularCards.nomarketable[i].length /
        calculatePrices(i, currency, 'CARDS', false);

      totalCost +=
        foilCards.marketable[i].length /
        calculatePrices(i, currency, 'FOILS', true);

      totalCost +=
        foilCards.nomarketable[i].length /
        calculatePrices(i, currency, 'FOILS', false);

      totalCost +=
        boosterPacks.marketable[i].length /
        calculatePrices(i, currency, 'PACKS', true);

      totalCost +=
        boosterPacks.nomarketable[i].length /
        calculatePrices(i, currency, 'PACKS', false);
    }

    return totalCost;
  }

  if (currency === 'GEMS') {
    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < regularCards.marketable[i].length; j += 1) {
        totalCost += calculatePrices(i, currency, 'CARDS', true);
      }

      for (let j = 0; j < regularCards.nomarketable[i].length; j += 1) {
        totalCost += calculatePrices(i, currency, 'CARDS', false);
      }

      for (let j = 0; j < foilCards.marketable[i].length; j += 1) {
        totalCost += calculatePrices(i, currency, 'FOILS', true);
      }

      for (let j = 0; j < foilCards.nomarketable[i].length; j += 1) {
        totalCost += calculatePrices(i, currency, 'FOILS', false);
      }

      for (let j = 0; j < boosterPacks.marketable[i].length; j += 1) {
        totalCost += calculatePrices(i, currency, 'PACKS', true);
      }

      for (let j = 0; j < boosterPacks.nomarketable[i].length; j += 1) {
        totalCost += calculatePrices(i, currency, 'PACKS', false);
      }
    }

    return totalCost;
  }

  return totalCost;
};

const checkRates = async (itemsReceived, itemsSent) => {
  const ItemsSent = itemsSent.map((items) => {
    if (items.name === 'Gems') {
      return `753-Gems`;
    }

    return items.name;
  });

  if (_.intersectionBy(acceptedCurrencies.gems, ItemsSent).length) {
    const amountOfgems = itemsSent
      .filter((item) => item.name === 'Gems')
      .reduce((acc, item) => acc + item.amount, 0);
    const totalCost = await calculateTotalCost('GEMS', itemsReceived);

    if (totalCost !== amountOfgems) {
      throw new Error('Invalid amount of gems');
    }
  }

  if (_.intersectionBy(acceptedCurrencies.tf, ItemsSent).length) {
    const amountOfKeys = itemsSent.length;
    const totalCost = await calculateTotalCost('TF2', itemsReceived);

    if (totalCost !== amountOfKeys) {
      throw new Error('Invalid amount of keys');
    }
  }
};

const checkItemsSent = async (itemsSent) => {
  const ItemsSent = itemsSent
    .map((items) => {
      if (items.name === 'Gems') {
        return `753-Gems`;
      }

      return items.name;
    })
    .filter((item) => {
      if (
        acceptedCurrencies.gems.includes(item) ||
        acceptedCurrencies.tf.includes(item)
      ) {
        return false;
      }

      return true;
    });

  if (ItemsSent.length) {
    throw new Error('Invalid manual trade offer');
  }
};

const checkItemsReceived = async (itemsReceived) => {
  const regularCardsReceived = await getRegularCard(itemsReceived);
  const foilCardsReceived = await getFoilCard(itemsReceived);
  const boosterPacksReceived = await getBoosterPack(itemsReceived);
  const ItemsReceived = itemsReceived.filter((item) => {
    if (
      _.intersectionBy(regularCardsReceived, [item], (x) => x.name).length ||
      _.intersectionBy(foilCardsReceived, [item], (x) => x.name).length ||
      _.intersectionBy(boosterPacksReceived, [item], (x) => x.name).length
    ) {
      return false;
    }

    return true;
  });

  if (ItemsReceived.length) {
    throw new Error('Invalid manual trade offer');
  }
};

const checkTradeOffer = async (itemsReceived, itemsSent) => {
  await checkItemsSent(itemsSent);
  await checkItemsReceived(itemsReceived);
};

export default async (offer) => {
  try {
    const itemsReceived = offer.itemsToReceive;
    const itemsSent = offer.itemsToGive;

    await checkTradeOffer(itemsReceived, itemsSent);
    await checkRates(itemsReceived, itemsSent);
  } catch (error) {
    throw new Error(error);
  }
};
