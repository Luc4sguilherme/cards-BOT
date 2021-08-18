import chatMessage from '../../../components/chatMessage.js';
import { stock } from '../../../components/inventory.js';
import log from '../../../components/log.js';
import messages from '../../../config/messages.js';

export default (sender) => {
  log.userChat(sender.getSteamID64(), '[ !STATS ]');

  const msg = messages.stock
    .replace('{KEYS1}', stock.tf.tradable)
    .replace('{KEYS2}', stock.tf.notradable)
    .replace('{GEMS1}', stock.gems.tradable)
    .replace('{GEMS2}', stock.gems.notradable)
    .replace('{REGULARCARDS1}', stock.regularCards.marketable)
    .replace('{REGULARCARDS2}', stock.regularCards.nomarketable)
    .replace('{FOILCARDS1}', stock.foilCards.marketable)
    .replace('{FOILCARDS2}', stock.foilCards.nomarketable)
    .replace('{PACKS1}', stock.boosterPacks.marketable)
    .replace('{PACKS2}', stock.boosterPacks.nomarketable);

  chatMessage(sender, `/pre ${msg}`);
};
