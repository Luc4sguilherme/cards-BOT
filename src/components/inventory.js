import async from 'async';
import moment from 'moment';

import acceptedCurrencies from '../config/currencies.js';
import log from './log.js';
import { playLoading } from './playLoading.js';
import { playStock } from './playStock.js';
import { client, manager } from './steamClient.js';
import { readFileAsync } from './utils.js';

export const stock = {
  tf: {
    tradable: 0,
    notradable: 0,
  },
  gems: {
    tradable: 0,
    notradable: 0,
  },
  foilCards: {
    marketable: 0,
    nomarketable: 0,
  },
  regularCards: {
    marketable: 0,
    nomarketable: 0,
  },
  boosterPacks: {
    marketable: 0,
    nomarketable: 0,
  },
};

export const filterBoosterPack = async (boosterPacks, marketable, size) => {
  const sets = JSON.parse(await readFileAsync('./data/set_data.json'));

  return boosterPacks
    .filter((boosterPack) => boosterPack.marketable === marketable)
    .filter((boosterPack) => sets[boosterPack.market_fee_app] === size);
};

export const filterCards = async (cards, marketable, size) => {
  const sets = JSON.parse(await readFileAsync('./data/set_data.json'));

  return cards
    .filter((card) => card.marketable === marketable)
    .filter((card) => sets[card.market_fee_app] === size);
};

export const getInventory = (id64, appid, contextid, tradable = true) =>
  new Promise((resolve, reject) => {
    manager.getUserInventoryContents(
      id64,
      appid,
      contextid,
      tradable,
      (error, inv) => {
        if (error) {
          reject(error);
        } else {
          resolve(inv);
        }
      }
    );
  });

export const getTF2key = (inventory) => {
  const keys = [];

  for (let i = 0; i < inventory.length; i += 1) {
    if (inventory[i].market_hash_name.indexOf(acceptedCurrencies.tf) >= 0) {
      keys.push(inventory[i]);
    }
  }

  return keys;
};

export const getGems = (inventory) => {
  const gems = [];

  for (let i = 0; i < inventory.length; i += 1) {
    if (inventory[i].market_hash_name.indexOf(acceptedCurrencies.gems) >= 0) {
      gems.push(inventory[i]);
    }
  }

  return gems;
};

export const getBoosterPack = (inventory) => {
  const boosterPacks = [];

  for (let i = 0; i < inventory.length; i += 1) {
    if (
      inventory[i].market_hash_name.indexOf(acceptedCurrencies.boosterPack) >= 0
    ) {
      boosterPacks.push(inventory[i]);
    }
  }

  return boosterPacks;
};

export const getRegularCard = (inventory) => {
  const cards = inventory
    .filter(
      (item) => item.getTag('item_class')?.internal_name === 'item_class_2'
    )
    .filter(
      (item) => item.getTag('cardborder')?.internal_name === 'cardborder_0'
    );

  return cards;
};

export const getFoilCard = (inventory) => {
  const cards = inventory
    .filter(
      (item) => item.getTag('item_class')?.internal_name === 'item_class_2'
    )
    .filter(
      (item) => item.getTag('cardborder')?.internal_name === 'cardborder_1'
    );

  return cards;
};

export const getTF2KeyByAmount = async (id64, amount) => {
  const inventory = await getInventory(id64, 440, 2);
  const keys = getTF2key(inventory);
  const keysToSend = [];

  if (keys.length < amount) {
    throw new Error('Insufficient number of key(s)');
  }

  for (let i = 0; i < amount; i += 1) {
    keysToSend.push(keys[i]);
  }

  return keysToSend;
};

export const getGemsByAmount = async (id64, amount) => {
  const inventory = await getInventory(id64, 753, 6);
  const gems = getGems(inventory);
  const gemsToSend = [];

  let amountOfGems = 0;
  let need = amount;

  for (let i = 0; i < gems.length; i += 1) {
    gems[i].amount = need <= gems[i].amount ? need : gems[i].amount;
    need -= gems[i].amount;
    amountOfGems += gems[i].amount;
    gemsToSend.push(gems[i]);
  }

  if (amountOfGems < amount) {
    throw new Error('Insufficient number of gem(s)');
  }

  return gemsToSend;
};

export const getRegularCardsByAmount = async (id64, amount) => {
  const inventory = await getInventory(id64, 753, 6);
  const cards = getRegularCard(inventory);

  const cardsToSend = [];

  if (cards.length < amount) {
    throw new Error('Insufficient number of regular card(s)');
  }

  for (let i = 0; i < amount; i += 1) {
    cardsToSend.push(cards[i]);
  }

  return cardsToSend;
};

export const getFoilCardsByAmount = async (id64, amount) => {
  const inventory = await getInventory(id64, 753, 6);
  const cards = getFoilCard(inventory);

  const cardsToSend = [];

  if (cards.length < amount) {
    throw new Error('Insufficient number of foil card(s)');
  }

  for (let i = 0; i < amount; i += 1) {
    cardsToSend.push(cards[i]);
  }

  return cardsToSend;
};

export const getBoosterPackByAmount = async (id64, amount) => {
  const inventory = await getInventory(id64, 753, 6);
  const packs = getBoosterPack(inventory);

  const boosterPackToSend = [];

  if (packs.length < amount) {
    throw new Error('Insufficient number of booster Pack(s)');
  }

  for (let i = 0; i < amount; i += 1) {
    boosterPackToSend.push(packs[i]);
  }

  return boosterPackToSend;
};

export const loadTF = async (sid) => {
  try {
    const inventoy = await getInventory(sid, 440, 2, false);
    const keys = getTF2key(inventoy);

    stock.tf.tradable = 0;
    stock.tf.notradable = 0;

    for (let i = 0; i < keys.length; i += 1) {
      if (acceptedCurrencies.tf.includes(keys[i].market_hash_name)) {
        if (keys[i].tradable) {
          stock.tf.tradable += 1;
        } else {
          stock.tf.notradable += 1;
        }
      }
    }
    log.info(
      `Bot's TF2 loaded: ${stock.tf.tradable} tradable, ${stock.tf.notradable} notradable.`
    );
  } catch (error) {
    throw new Error(
      `An error occurred while getting bot TF2 inventory: ${error.message}`
    );
  }
};

export const loadGems = async (sid) => {
  try {
    const inventoy = await getInventory(sid, 753, 6, false);
    const gems = await getGems(inventoy);

    stock.gems.tradable = 0;
    stock.gems.notradable = 0;

    for (let i = 0; i < gems.length; i += 1) {
      if (acceptedCurrencies.gems.includes(gems[i].market_hash_name)) {
        if (gems[i].tradable) {
          stock.gems.tradable += gems[i].amount;
        } else {
          stock.gems.notradable += gems[i].amount;
        }
      }
    }
    log.info(
      `Bot's Gems loaded: ${stock.gems.tradable} tradable, ${stock.gems.notradable} notradable.`
    );
  } catch (error) {
    throw new Error(
      `An error occurred while getting bot gems inventory: ${error.message}`
    );
  }
};

export const loadRegularCards = async (sid) => {
  try {
    const inventoy = await getInventory(sid, 753, 6, true);
    const regularCards = await getRegularCard(inventoy);

    stock.regularCards.marketable = 0;
    stock.regularCards.nomarketable = 0;

    for (let i = 5; i <= 15; i += 1) {
      const regularCardsMarketable = await filterCards(regularCards, true, i);
      const regularCardsNoMarketable = await filterCards(
        regularCards,
        false,
        i
      );

      stock.regularCards.marketable += regularCardsMarketable.length;
      stock.regularCards.nomarketable += regularCardsNoMarketable.length;
    }
    log.info(
      `Bot's Regular cards loaded: ${stock.regularCards.marketable} marketable, ${stock.regularCards.nomarketable} nomarketable.`
    );
  } catch (error) {
    throw new Error(
      `An error occurred while getting bot regular cards inventory: ${error.message}`
    );
  }
};

export const loadFoilCard = async (sid) => {
  try {
    const inventoy = await getInventory(sid, 753, 6, true);
    const foilCards = await getFoilCard(inventoy);

    stock.foilCards.marketable = 0;
    stock.foilCards.nomarketable = 0;

    for (let i = 5; i <= 15; i += 1) {
      const foilCardsMarketable = await filterCards(foilCards, true, i);
      const foilCardsNoMarketable = await filterCards(foilCards, false, i);

      stock.foilCards.marketable += foilCardsMarketable.length;
      stock.foilCards.nomarketable += foilCardsNoMarketable.length;
    }
    log.info(
      `Bot's Foil cards loaded: ${stock.foilCards.marketable} marketable, ${stock.foilCards.nomarketable} nomarketable.`
    );
  } catch (error) {
    throw new Error(
      `An error occurred while getting bot foil cards inventory: ${error.message}`
    );
  }
};

export const loadPacks = async (sid) => {
  try {
    const inventoy = await getInventory(sid, 753, 6, true);
    const boosterPacks = await getBoosterPack(inventoy);

    stock.boosterPacks.marketable = 0;
    stock.boosterPacks.nomarketable = 0;

    for (let i = 5; i <= 15; i += 1) {
      const boosterPacksMarketable = await filterCards(boosterPacks, true, i);
      const boosterPacksNoMarketable = await filterCards(
        boosterPacks,
        false,
        i
      );

      stock.boosterPacks.marketable += boosterPacksMarketable.length;
      stock.boosterPacks.nomarketable += boosterPacksNoMarketable.length;
    }
    log.info(
      `Bot's Booster packs loaded: ${stock.boosterPacks.marketable} marketable, ${stock.boosterPacks.nomarketable} nomarketable.`
    );
  } catch (error) {
    throw new Error(
      `An error occurred while getting bot booster packs inventory: ${error.message}`
    );
  }
};

export const getUserSteamInventory = async (id64) => {
  const inventory = await getInventory(id64, 753, 6);
  const regularCards = await getRegularCard(inventory);
  const foilCards = await getFoilCard(inventory);
  const boosterPacks = await getBoosterPack(inventory);
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

export const loadInventory = async (load) => {
  try {
    const startedTime = Date.now();
    const LoadInventories = [];
    playLoading.resetTimer();
    playLoading.startTimer();

    const sid = client.steamID.getSteamID64();

    const Inventory = {
      REGULARCARDS: async () => {
        await async.retry({ times: 100, interval: 5000 }, async () => {
          await loadRegularCards(sid);
        });
      },
      FOILCARDS: async () => {
        await async.retry({ times: 100, interval: 5000 }, async () => {
          await loadFoilCard(sid);
        });
      },
      PACKS: async () => {
        await async.retry({ times: 100, interval: 5000 }, async () => {
          await loadPacks(sid);
        });
      },
      TF2: async () => {
        await async.retry({ times: 100, interval: 5000 }, async () => {
          await loadTF(sid);
        });
      },
      GEMS: async () => {
        await async.retry({ times: 100, interval: 5000 }, async () => {
          await loadGems(sid);
        });
      },
    };

    for (let i = 0; i < load.length; i += 1) {
      LoadInventories.push(Inventory[load[i]]);
    }

    await async.series(LoadInventories);
    playLoading.resetTimer();
    playStock(stock);

    log.warn(
      `Inventory loaded in ${moment().diff(
        startedTime,
        'seconds',
        true
      )} seconds!`
    );
  } catch (error) {
    log.error(error);
  }
};

export const updateStock = async (offer) => {
  const load = [];

  function add(param) {
    load.push(param);
  }

  const itemsSent = offer.itemsToGive;
  const itemsReceived = offer.itemsToReceive;

  if (getTF2key(itemsSent).length || getTF2key(itemsReceived).length) {
    add('TF2');
  }

  if (getGems(itemsSent).length || getGems(itemsReceived).length) {
    add('GEMS');
  }

  if (
    getRegularCard(itemsSent).length ||
    getRegularCard(itemsReceived).length
  ) {
    add('REGULARCARDS');
  }

  if (getFoilCard(itemsSent).length || getFoilCard(itemsReceived).length) {
    add('FOILCARDS');
  }

  if (
    getBoosterPack(itemsSent).length ||
    getBoosterPack(itemsReceived).length
  ) {
    add('PACKS');
  }

  if (load.length !== 0) {
    await loadInventory(load);
  }
};
