import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import { client } from '../../../components/steamClient.js';
import messages from '../../../config/messages.js';

const SID64REGEX = new RegExp(/^[0-9]{17}$/);

export default (sender, msg) => {
  const id64 = msg.toUpperCase().replace('!UNBLOCK ', '').toString();

  log.adminChat(sender.getSteamID64(), `[ !UNBLOCK ${id64} ]`);
  if (SID64REGEX.test(id64)) {
    if (id64 !== sender.getSteamID64()) {
      client.unblockUser(id64, (err) => {
        if (err) {
          chatMessage(sender, messages.unblock.error);
          log.error(`An error occured while unblocking user: ${err}`);
        } else {
          chatMessage(sender, messages.unblock.response);
        }
      });
    } else {
      chatMessage(sender, messages.unblock.notallowed);
    }
  } else {
    chatMessage(sender, messages.error.inputinvalid.steamid64);
  }
};
