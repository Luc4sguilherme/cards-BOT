import chatMessage from '../../../../components/chatMessage.js';
import log from '../../../../components/log.js';
import messages from '../../../../config/messages.js';
import prices from '../../../../config/rates.js';

export default (sender, currency) => {
  log.userChat(sender.getSteamID64(), `[ !PRICES ${currency} ]`);
  chatMessage(sender, messages.request);

  let regularCards = '';
  let foilCards = '';
  let boosterPack = '';

  for (let i = 5; i <= 15; i += 1) {
    regularCards += ` • 1 TF2 key for Regular Card (sets of ${i}): Marketable: ${prices.tf[i].regularCards.marketable} | Non-Marketable: ${prices.tf[i].regularCards.nomarketable} \n `;
    foilCards += ` • 1 TF2 key for Foil Card (sets of ${i}): Marketable: ${prices.tf[i].foilCards.marketable} | Non-Marketable: ${prices.tf[i].foilCards.nomarketable} \n `;
    boosterPack += ` • 1 TF2 key for Booster Pack (sets of ${i}): Marketable: ${prices.tf[i].boosterPacks.marketable} | Non-Marketable: ${prices.tf[i].boosterPacks.nomarketable} \n `;

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
