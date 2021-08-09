import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import messages from '../../../config/messages.js';

export default (sender) => {
  log.userChat(sender.getSteamID64(), '[ !COMMANDS ]');

  const msg = messages.commands;

  let message = '/pre ';
  for (let i = 0; i < msg.length; i += 1) {
    message += msg[i];
  }

  chatMessage(sender, message);
};
