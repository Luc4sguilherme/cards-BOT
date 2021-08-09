import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import { client } from '../../../components/steamClient.js';
import messages from '../../../config/messages.js';

export default (sender) => {
  chatMessage(sender, messages.request);
  log.adminChat(sender.getSteamID64(), '[ !RESTART ]');
  chatMessage(sender, "I'll be back in a minute!");
  client.relog();
};
