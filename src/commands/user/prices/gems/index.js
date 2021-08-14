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
    regularCards += ` • 1 Regular Card (sets of ${i}): Marketable: ${calculatePrices(
      i,
      'GEMS',
      'CARDS',
      true
    )} Gems | Non-Marketable: ${calculatePrices(
      i,
      'GEMS',
      'CARDS',
      false
    )} Gems \n `;

    foilCards += ` • 1 Foil Card (sets of ${i}): Marketable: ${calculatePrices(
      i,
      'GEMS',
      'FOILS',
      true
    )} Gems | Non-Marketable: ${calculatePrices(
      i,
      'GEMS',
      'FOILS',
      false
    )} Gems \n `;

    boosterPack += ` • 1 Booster Pack (sets of ${i}): Marketable: ${calculatePrices(
      i,
      'GEMS',
      'PACKS',
      true
    )} Gems | Non-Marketable: ${calculatePrices(
      i,
      'GEMS',
      'PACKS',
      false
    )} Gems \n `;

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
