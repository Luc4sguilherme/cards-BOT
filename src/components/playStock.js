import { client } from './steamClient.js';

export const playStock = (stock) => {
  const playThis = ['', true];

  playThis[0] = `${stock.gems.tradable} Gems – Buying Random Cards, Foils & Booster Packs`;

  client.gamesPlayed(playThis);
};
