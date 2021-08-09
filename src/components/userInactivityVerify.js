import moment from 'moment';

import main from '../config/main.js';
import messages from '../config/messages.js';
import chatMessage from './chatMessage.js';
import log from './log.js';
import { client } from './steamClient.js';
import { getUserData, removeUserData } from './userLocalInfos.js';

async function analyze(id64) {
  try {
    const data = await getUserData(id64);
    const dateOfLastMsg = data?.dateOfLastMsg;

    if (dateOfLastMsg) {
      const currentDate = String(moment(new Date()).toISOString());
      const maxDate = moment.duration(main.maxInactiveDays, 'days');
      const lastComment = moment(dateOfLastMsg).toISOString();

      if (moment(currentDate).isSameOrAfter(moment(lastComment).add(maxDate))) {
        chatMessage(id64, messages.inactive);
        client.removeFriend(id64);
        await removeUserData(id64);
      }
    }
  } catch (error) {
    log.error(error.message);
  }
}

export default () => {
  setInterval(async () => {
    for (let i = 0; i < Object.keys(client.myFriends).length; i += 1) {
      if (Object.values(client.myFriends)[i] === 3) {
        await analyze(Object.keys(client.myFriends)[i]);
      }
    }
  }, moment.duration(24, 'hours'));
};
