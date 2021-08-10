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
    regularCards += ` • 1 Regular Card (sets of ${i}): Marketable: ${prices.gems[i].regularCards.marketable} Gems | Non-Marketable: ${prices.gems[i].regularCards.nomarketable} Gems \n `;
    foilCards += ` • 1 Foil Card (sets of ${i}): Marketable: ${prices.gems[i].foilCards.marketable} Gems | Non-Marketable: ${prices.gems[i].foilCards.nomarketable} Gems \n `;
    boosterPack += ` • 1 Booster Pack (sets of ${i}): Marketable: ${prices.gems[i].boosterPacks.marketable} Gems | Non-Marketable: ${prices.gems[i].boosterPacks.nomarketable} Gems \n `;

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
