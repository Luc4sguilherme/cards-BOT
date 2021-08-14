import async from 'async';
import _ from 'lodash';
import moment from 'moment';

import acceptedCurrencies from '../config/currencies.js';
import log from './log.js';
import { playLoading } from './playLoading.js';
import { playStock } from './playStock.js';
import { client, community, manager } from './steamClient.js';
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

export const getInventory = (id64, appid, contextid) =>
  new Promise((resolve, reject) => {
    manager.getUserInventoryContents(
      id64,
      appid,
      contextid,
      true,
      (error, inv) => {
        if (error) {
          reject(error);
        } else {
          resolve(inv);
        }
      }
    );
  });

export const getTF2key = async (inventory) => {
  const keys = [];

  for (let i = 0; i < inventory.length; i += 1) {
    if (inventory[i].market_hash_name.indexOf(acceptedCurrencies.tf) >= 0) {
      keys.push(inventory[i]);
    }
  }

  return keys;
};

export const getGems = async (inventory) => {
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
  const keys = await getTF2key(inventory);
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
  const gems = await getGems(inventory);
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
  const cards = await getRegularCard(inventory);

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
  const cards = await getFoilCard(inventory);

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
  const packs = await getBoosterPack(inventory);

  const boosterPackToSend = [];

  if (packs.length < amount) {
    throw new Error('Insufficient number of booster Pack(s)');
  }

  for (let i = 0; i < amount; i += 1) {
    boosterPackToSend.push(packs[i]);
  }

  return boosterPackToSend;
};

export const loadTF = (sid) =>
  new Promise((resolve, reject) => {
    community.getUserInventoryContents(sid, 440, 2, false, (error, inv) => {
      if (!error) {
        stock.tf.tradable = 0;
        stock.tf.notradable = 0;
        for (let i = 0; i < inv.length; i += 1) {
          if (acceptedCurrencies.tf.includes(inv[i].market_hash_name)) {
            if (inv[i].tradable) {
              stock.tf.tradable += 1;
            } else {
              stock.tf.notradable += 1;
            }
          }
        }
        log.info(
          `Bot's TF2 loaded: ${stock.tf.tradable} tradable, ${stock.tf.notradable} notradable.`
        );
        resolve();
      } else {
        reject(
          new Error(
            `An error occurred while getting bot TF2 inventory: ${error}`
          )
        );
      }
    });
  });

export const loadGems = (sid) =>
  new Promise((resolve, reject) => {
    community.getUserInventoryContents(sid, 753, 6, false, (error, inv) => {
      if (!error) {
        stock.gems.tradable = 0;
        stock.gems.notradable = 0;

        for (let i = 0; i < inv.length; i += 1) {
          if (acceptedCurrencies.gems.includes(inv[i].market_hash_name)) {
            if (inv[i].tradable) {
              stock.gems.tradable += inv[i].amount;
            } else {
              stock.gems.notradable += inv[i].amount;
            }
          }
        }
        log.info(
          `Bot's Gems loaded: ${stock.gems.tradable} tradable, ${stock.gems.notradable} notradable.`
        );
        resolve();
      } else {
        reject(
          new Error(
            `An error occurred while getting bot gems inventory: ${error}`
          )
        );
      }
    });
  });

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

  const itemsSent = offer.itemsToGive.map((items) => {
    if (items.name === 'Gems') {
      return `753-Gems`;
    }

    return items.name;
  });

  const itemsReceived = offer.itemsToReceive.map((items) => {
    if (items.name === 'Gems') {
      return `753-Gems`;
    }

    return items.name;
  });

  if (
    _.intersectionBy(acceptedCurrencies.tf, itemsSent).length ||
    _.intersectionBy(acceptedCurrencies.tf, itemsReceived).length
  ) {
    add('TF2');
  }

  if (
    _.intersectionBy(acceptedCurrencies.gems, itemsSent).length ||
    _.intersectionBy(acceptedCurrencies.gems, itemsReceived).length
  ) {
    add('GEMS');
  }

  if (load.length !== 0) {
    await loadInventory(load);
  }
};
