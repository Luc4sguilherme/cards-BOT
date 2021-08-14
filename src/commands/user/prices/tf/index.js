import calculatePrices from '../../../../components/calculatePrices.js';
import chatMessage from '../../../../components/chatMessage.js';
import log from '../../../../components/log.js';
import messages from '../../../../config/messages.js';

export default (sender, currency) => {
  log.userChat(sender.getSteamID64(), `[ !PRICES ${currency} ]`);
  chatMessage(sender, messages.request);

  let regularCards = '';
  let foilCards = '';
  let boosterPack = '';

  for (let i = 5; i <= 15; i += 1) {
    regularCards += ` • 1 TF2 key for Regular Card (sets of ${i}): Marketable: ${calculatePrices(
      i,
      'TF2',
      'CARDS',
      true
    )} cards | Non-Marketable: ${calculatePrices(
      i,
      'TF2',
      'CARDS',
      false
    )} cards \n `;

    foilCards += ` • 1 TF2 key for Foil Card (sets of ${i}): Marketable: ${calculatePrices(
      i,
      'TF2',
      'FOILS',
      true
    )} cards | Non-Marketable: ${calculatePrices(
      i,
      'TF2',
      'FOILS',
      false
    )} cards \n `;

    boosterPack += ` • 1 TF2 key for Booster Pack (sets of ${i}): Marketable: ${calculatePrices(
      i,
      'TF2',
      'PACKS',
      true
    )} packs | Non-Marketable: ${calculatePrices(
      i,
      'TF2',
      'PACKS',
      false
    )} packs \n `;

    if (i === 15) {
      regularCards += '\n ';
      foilCards += '\n ';
      boosterPack += '\n ';
    }
  }

  const message = messages.rates
    .replace('{regular_cards}', regularCards)
    .replace('{foil_cards}', foilCards)
    .replace('{booster_pack}', boosterPack);

  chatMessage(sender, `/pre ${message}`);
};
