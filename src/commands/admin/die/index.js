import process from 'process';
import kill from 'tree-kill';

import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import messages from '../../../config/messages.js';

export default (sender) => {
  chatMessage(sender, messages.request);
  log.adminChat(sender.getSteamID64(), '[ !DIE ]');

  kill(process.ppid);
};
