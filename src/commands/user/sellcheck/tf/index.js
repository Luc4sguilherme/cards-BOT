import chatMessage from '../../../../components/chatMessage.js';
import { getUserSteamInventory } from '../../../../components/inventory.js';
import log from '../../../../components/log.js';
import messages from '../../../../config/messages.js';
import prices from '../../../../config/rates.js';

export default async (sender, currency) => {
  try {
    log.userChat(sender.getSteamID64(), `[ !SELLCHECK ${currency} ]`);
    chatMessage(sender, messages.request);

    const { regularCards, foilCards, boosterPacks } =
      await getUserSteamInventory(sender.getSteamID64());

    const items = {
      regularCards: {
        marketable: {
          quantity: 0,
          avaliable: 0,
          keys: 0,
        },
        nomarketable: { quantity: 0, avaliable: 0, keys: 0 },
      },
      foilCards: {
        marketable: { quantity: 0, avaliable: 0, keys: 0 },
        nomarketable: { quantity: 0, avaliable: 0, keys: 0 },
      },
      boosterPacks: {
        marketable: { quantity: 0, avaliable: 0, keys: 0 },
        nomarketable: { quantity: 0, avaliable: 0, keys: 0 },
      },
    };

    for (let i = 5; i <= 15; i += 1) {
      items.regularCards.marketable.quantity +=
        regularCards.marketable[i].length;
      items.regularCards.marketable.keys +=
        regularCards.marketable[i].length /
        prices.tf[i].regularCards.marketable;

      items.regularCards.nomarketable.quantity +=
        regularCards.nomarketable[i].length;
      items.regularCards.nomarketable.keys +=
        regularCards.nomarketable[i].length /
        prices.tf[i].regularCards.nomarketable;

      items.foilCards.marketable.quantity += foilCards.marketable[i].length;
      items.foilCards.marketable.keys +=
        foilCards.marketable[i].length / prices.tf[i].foilCards.marketable;

      items.foilCards.nomarketable.quantity += foilCards.nomarketable[i].length;
      items.foilCards.nomarketable.keys +=
        foilCards.nomarketable[i].length / prices.tf[i].foilCards.nomarketable;

      items.boosterPacks.marketable.quantity +=
        boosterPacks.marketable[i].length;
      items.boosterPacks.marketable.keys +=
        boosterPacks.marketable[i].length /
        prices.tf[i].boosterPacks.marketable;

      items.boosterPacks.nomarketable.quantity +=
        boosterPacks.nomarketable[i].length;
      items.boosterPacks.nomarketable.keys +=
        boosterPacks.nomarketable[i].length /
        prices.tf[i].boosterPacks.nomarketable;
    }

    let needRegularCards = parseInt(
      items.regularCards.marketable.keys + items.regularCards.nomarketable.keys,
      10
    );

    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < regularCards.marketable[i].length; j += 1) {
        const numberOfDigits = String(
          prices.tf[i].regularCards.marketable
        ).length;

        if (needRegularCards.toFixed(numberOfDigits) > 0) {
          items.regularCards.marketable.avaliable += 1;
          needRegularCards -= 1 / prices.tf[i].regularCards.marketable;
        } else {
          break;
        }
      }

      for (let j = 0; j < regularCards.nomarketable[i].length; j += 1) {
        const numberOfDigits = String(
          prices.tf[i].regularCards.nomarketable
        ).length;

        if (needRegularCards.toFixed(numberOfDigits) > 0) {
          items.regularCards.nomarketable.avaliable += 1;
          needRegularCards -= 1 / prices.tf[i].regularCards.nomarketable;
        } else {
          break;
        }
      }
    }

    let needFoilCards = parseInt(
      items.foilCards.marketable.keys + items.foilCards.nomarketable.keys,
      10
    );
    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < foilCards.marketable[i].length; j += 1) {
        const numberOfDigits = String(prices.tf[i].foilCards.marketable).length;

        if (needFoilCards.toFixed(numberOfDigits) > 0) {
          items.foilCards.marketable.avaliable += 1;
          needFoilCards -= 1 / prices.tf[i].foilCards.marketable;
        } else {
          break;
        }
      }

      for (let j = 0; j < foilCards.nomarketable[i].length; j += 1) {
        const numberOfDigits = String(
          prices.tf[i].foilCards.nomarketable
        ).length;

        if (needFoilCards.toFixed(numberOfDigits) > 0) {
          items.foilCards.nomarketable.avaliable += 1;
          needFoilCards -= 1 / prices.tf[i].foilCards.nomarketable;
        } else {
          break;
        }
      }
    }

    let needBoosterPacks = parseInt(
      items.boosterPacks.marketable.keys + items.boosterPacks.nomarketable.keys,
      10
    );
    for (let i = 5; i <= 15; i += 1) {
      for (let j = 0; j < boosterPacks.marketable[i].length; j += 1) {
        const numberOfDigits = String(
          prices.tf[i].boosterPacks.marketable
        ).length;

        if (needBoosterPacks.toFixed(numberOfDigits) > 0) {
          items.boosterPacks.marketable.avaliable += 1;
          needBoosterPacks -= 1 / prices.tf[i].boosterPacks.marketable;
        } else {
          break;
        }
      }

      for (let j = 0; j < boosterPacks.nomarketable[i].length; j += 1) {
        const numberOfDigits = String(
          prices.tf[i].boosterPacks.nomarketable
        ).length;

        if (needBoosterPacks.toFixed(numberOfDigits) > 0) {
          items.boosterPacks.nomarketable.avaliable += 1;
          needBoosterPacks -= 1 / prices.tf[i].boosterPacks.nomarketable;
        } else {
          break;
        }
      }
    }

    const totalCost = Number.parseInt(
      items.regularCards.marketable.keys +
        items.regularCards.nomarketable.keys +
        items.foilCards.marketable.keys +
        items.foilCards.nomarketable.keys +
        items.boosterPacks.marketable.keys +
        items.boosterPacks.nomarketable.keys,
      10
    );

    if (totalCost === 0) {
      chatMessage(sender, messages.error.outofstock.anything.them);
      return;
    }

    const regularCardsTotal =
      items.regularCards.marketable.quantity +
      items.regularCards.nomarketable.quantity;

    const regularCardsTotalAvaliable =
      items.regularCards.marketable.avaliable +
      items.regularCards.nomarketable.avaliable;

    const regularCardsTotalCost = Number.parseInt(
      items.regularCards.marketable.keys + items.regularCards.nomarketable.keys,
      10
    );

    const foilCardsTotal =
      items.foilCards.marketable.quantity +
      items.foilCards.nomarketable.quantity;

    const foilCardsTotalAvaliable =
      items.foilCards.marketable.avaliable +
      items.foilCards.nomarketable.avaliable;

    const foilCardsTotalCost = Number.parseInt(
      items.foilCards.marketable.keys + items.foilCards.nomarketable.keys,
      10
    );

    const boosterPacksTotal =
      items.boosterPacks.marketable.quantity +
      items.boosterPacks.nomarketable.quantity;

    const boosterPacksTotalAvaliable =
      items.boosterPacks.marketable.avaliable +
      items.boosterPacks.nomarketable.avaliable;

    const boosterPacksTotalCost = Number.parseInt(
      items.boosterPacks.marketable.keys + items.boosterPacks.nomarketable.keys,
      10
    );

    let regularCardsMSG = `• ${regularCardsTotal} Regular Card(s): `;
    let foilCardsMSG = `• ${foilCardsTotal} Foil Card(s): `;
    let boosterPacksMSG = `• ${boosterPacksTotal} Booster Pack(s): `;

    Object.keys(items).forEach((value) => {
      let message = '';

      if (
        items[value].marketable.quantity &&
        items[value].nomarketable.quantity
      ) {
        message += `${items[value].marketable.quantity} Marketables, ${items[value].nomarketable.quantity} Non-Marketables.`;
      } else if (items[value].marketable.quantity) {
        message += `${items[value].marketable.quantity} Marketables.`;
      } else {
        message += `${items[value].nomarketable.quantity} Non-Marketables.`;
      }

      if (value === 'regularCards') {
        regularCardsMSG += message;
      }

      if (value === 'foilCards') {
        foilCardsMSG += message;
      }

      if (value === 'boosterPacks') {
        boosterPacksMSG += message;
      }
    });

    let message = `/pre You currently have: \n `;

    if (regularCardsTotal) {
      message += `${regularCardsMSG} \n `;
    }

    if (foilCardsTotal) {
      message += `${foilCardsMSG} \n `;
    }

    if (boosterPacksTotal) {
      message += `${boosterPacksMSG} \n `;
    }

    message += `\n - You can get up to ${totalCost} key(s) for everything, with the following rates: \n `;

    if (
      (regularCardsTotalCost && foilCardsTotalCost) ||
      (foilCardsTotalCost && boosterPacksTotalCost) ||
      (boosterPacksTotalCost && regularCardsTotalCost)
    ) {
      message += ` • ${totalCost} key(s) for everything. \n   └─ !sellall tf2 \n\n `;
    }

    if (regularCardsTotalCost) {
      message += ` • ${regularCardsTotalCost} key(s) for ${regularCardsTotalAvaliable} Regular Card(s). \n   └─ !sellcards tf2 \n\n `;
    }

    if (foilCardsTotalCost) {
      message += ` • ${foilCardsTotalCost} key(s) for ${foilCardsTotalAvaliable} Foil Card(s). \n   └─ !sellfoils tf2 \n\n `;
    }

    if (boosterPacksTotalCost) {
      message += ` • ${boosterPacksTotalCost} key(s) for ${boosterPacksTotalAvaliable} Booster Pack(s). \n   └─ !sellpacks tf2 \n\n `;
    }

    chatMessage(sender.getSteamID64(), message);
  } catch (error) {
    log.error(error.message);
  }
};
