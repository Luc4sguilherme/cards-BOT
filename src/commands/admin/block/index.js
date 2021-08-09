import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import { client } from '../../../components/steamClient.js';
import messages from '../../../config/messages.js';

const SID64REGEX = new RegExp(/^[0-9]{17}$/);

export default (sender, msg) => {
  const id64 = msg.toUpperCase().replace('!BLOCK ', '').toString();

  log.adminChat(sender.getSteamID64(), `[ !BLOCK ${id64} ]`);
  if (SID64REGEX.test(id64)) {
    if (id64 !== sender.getSteamID64()) {
      client.blockUser(id64, (err) => {
        if (err) {
          chatMessage(sender, messages.block.error);
          log.error(`An error occured while blocking user: ${err}`);
        } else {
          chatMessage(sender, messages.block.response);
        }
      });
      client.removeFriend(id64);
    } else {
      chatMessage(sender, messages.block.notallowed);
    }
  } else {
    chatMessage(sender, messages.error.inputinvalid.steamid64);
  }
};
