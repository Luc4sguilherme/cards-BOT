import chatMessage from '../../../components/chatMessage.js';
import { loadInventory } from '../../../components/inventory.js';
import log from '../../../components/log.js';
import messages from '../../../config/messages.js';

export default async (sender) => {
  const load = ['TF2', 'GEMS'];

  chatMessage(sender, messages.request);
  log.adminChat(sender.getSteamID64(), '[ !RELOAD ]');
  await loadInventory(load);
  chatMessage(sender, 'Loaded Inventory.');
};
