import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import main from '../../../config/main.js';

export default (sender) => {
  log.userChat(sender.getSteamID64(), '[ !BOTS ]');

  for (let i = 0; i < main.botList.length; i += 1) {
    if (main.botList[i].length) {
      chatMessage(
        sender,
        `https://steamcommunity.com/profiles/${main.botList[i]}`
      );
    } else {
      chatMessage(sender, `I don't have another bot.`);
    }
  }
};
