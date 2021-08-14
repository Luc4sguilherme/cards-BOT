import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import { client } from '../../../components/steamClient.js';
import { delay } from '../../../components/utils.js';
import messages from '../../../config/messages.js';

export default async (sender, msg) => {
  const message = msg
    .replace(/>/g, '')
    .replace(/</g, '')
    .substring('!BROADCAST'.length)
    .trim();

  if (message.length > 0) {
    log.adminChat(sender.getSteamID64(), `[ !BROADCAST ]`);

    for (let i = 0; i <= Object.keys(client.myFriends).length; i += 1) {
      if (Object.values(client.myFriends)[i] === 3) {
        chatMessage(Object.keys(client.myFriends)[i], `/pre ${message}`);
        await delay(200);
      }
    }
  } else {
    chatMessage(sender, messages.error.missingInput.message);
  }
};
