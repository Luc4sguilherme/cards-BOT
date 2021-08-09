import chatMessage from '../../../components/chatMessage.js';
import { stock } from '../../../components/inventory.js';
import log from '../../../components/log.js';
import messages from '../../../config/messages.js';

export default (sender) => {
  log.userChat(sender.getSteamID64(), '[ !STATS ]');

  const msg = messages.stock
    .replace('{KEYS}', stock.tf.tradable)
    .replace('{GEMS}', stock.gems.tradable);

  chatMessage(sender, `/pre ${msg}`);
};
