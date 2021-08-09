import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import { client } from '../../../components/steamClient.js';
import main from '../../../config/main.js';
import messages from '../../../config/messages.js';

export default (sender, msg) => {
  log.userChat(sender.getSteamID64(), '[ !SUPPORT ]');
  const message = msg.substring('!SUPPORT'.length).trim();

  if (message.length > 0) {
    for (let i = 0; i < main.admins.length; i += 1) {
      chatMessage(
        main.admins[i],
        messages.support.response.admin
          .replace(
            '{USERNAME}',
            client.users[sender.getSteamID64()].player_name
          )
          .replace('{ID64}', sender.getSteamID64())
          .replace('{MESSAGE}', message)
      );
    }

    chatMessage(sender, messages.support.response.user);
  } else {
    chatMessage(sender, messages.support.error);
  }
};
