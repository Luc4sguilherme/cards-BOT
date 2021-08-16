// prices.gems[i].regularCards.marketable

import marketableGemsRates from '../config/rates/gems/marketable.js';
import noMarketableGemsRates from '../config/rates/gems/nomarketable.js';
import marketableTF2Rates from '../config/rates/tf2/marketable.js';
import noMarketableTF2Rates from '../config/rates/tf2/nomarketable.js';

export default (numberOfCardsPerSet, currency, type, marketable) => {
  if (currency === 'GEMS') {
    if (marketable) {
      if (type === 'FOILS') {
        return Number.parseInt(
          marketableGemsRates.foils[numberOfCardsPerSet] / numberOfCardsPerSet,
          10
        );
      }

      if (type === 'CARDS') {
        return Number.parseInt(
          marketableGemsRates.cards[numberOfCardsPerSet] / numberOfCardsPerSet,
          10
        );
      }

      if (type === 'PACKS') {
        return (
          3 *
          Number.parseInt(
            marketableGemsRates.cards[numberOfCardsPerSet] /
              numberOfCardsPerSet,
            10
          )
        );
      }
    } else {
      if (type === 'FOILS') {
        return Number.parseInt(
          noMarketableGemsRates.foils[numberOfCardsPerSet] /
            numberOfCardsPerSet,
          10
        );
      }

      if (type === 'CARDS') {
        return Number.parseInt(
          noMarketableGemsRates.cards[numberOfCardsPerSet] /
            numberOfCardsPerSet,
          10
        );
      }

      if (type === 'PACKS') {
        return (
          3 *
          Number.parseInt(
            noMarketableGemsRates.cards[numberOfCardsPerSet] /
              numberOfCardsPerSet,
            10
          )
        );
      }
    }
  }

  if (currency === 'TF2') {
    if (marketable) {
      if (type === 'FOILS') {
        return marketableTF2Rates.foils[numberOfCardsPerSet];
      }

      if (type === 'CARDS') {
        return marketableTF2Rates.cards[numberOfCardsPerSet];
      }

      if (type === 'PACKS') {
        return Number.parseInt(
          marketableTF2Rates.cards[numberOfCardsPerSet] / 3,
          10
        );
      }
    } else {
      if (type === 'FOILS') {
        return noMarketableTF2Rates.foils[numberOfCardsPerSet];
      }

      if (type === 'CARDS') {
        return noMarketableTF2Rates.cards[numberOfCardsPerSet];
      }

      if (type === 'PACKS') {
        return Number.parseInt(
          noMarketableTF2Rates.cards[numberOfCardsPerSet] / 3,
          10
        );
      }
    }
  }

  throw new Error('An error occurred while calculating the price');
};
