import main from '../config/main.js';
import messages from '../config/messages.js';
import chatMessage from './chatMessage.js';
import { client } from './steamClient.js';

const maxMsgPerSec = 1;
let msgPerSec = {};

export function isSpam(id64) {
  if (!main.admins.includes(id64)) {
    if (msgPerSec[id64] !== undefined) {
      msgPerSec[id64] += 1;
    } else {
      msgPerSec[id64] = 0;
    }

    if (msgPerSec[id64] >= maxMsgPerSec) {
      return true;
    }
  }

  return false;
}

export default () => {
  setInterval(() => {
    for (let i = 0; i < Object.keys(msgPerSec).length; i += 1) {
      if (!main.admins.includes(Object.keys(msgPerSec)[i])) {
        if (msgPerSec[Object.keys(msgPerSec)[i]] === maxMsgPerSec) {
          chatMessage(Object.keys(msgPerSec)[i], messages.spam.level_1);
        } else if (msgPerSec[Object.keys(msgPerSec)[i]] > maxMsgPerSec) {
          chatMessage(Object.keys(msgPerSec)[i], messages.spam.level_2);
          client.removeFriend(Object.keys(msgPerSec)[i]);

          for (let j = 0; j < main.admins.length; j += 1) {
            chatMessage(
              main.admins[j],
              messages.spam.adminNotification.replace(
                /{STEAMID64}/g,
                Object.keys(msgPerSec)[i]
              )
            );
          }
        }
      }
    }

    msgPerSec = {};
  }, 1000);
};
