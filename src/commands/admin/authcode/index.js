import SteamTotp from 'steam-totp';

import chatMessage from '../../../components/chatMessage.js';
import log from '../../../components/log.js';
import main from '../../../config/main.js';

export default (sender) => {
  log.adminChat(sender.getSteamID64(), '[ !AUTHCODE ]');
  chatMessage(sender, `AUTHCODE: ${SteamTotp.getAuthCode(main.sharedSecret)}`);
};
