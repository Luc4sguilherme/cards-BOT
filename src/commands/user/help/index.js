import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import messages from '../../../config/messages.js';

export default (sender) => {
  log.userChat(sender.getSteamID64(), '[ !HELP ]');

  chatMessage(sender, messages.help);
};
