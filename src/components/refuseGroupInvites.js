import main from '../config/main.js';
import { client } from './steamClient.js';

export default () => {
  if (main.steamGroup.refuseInvites) {
    for (let i = 0; i < Object.keys(client.myGroups).length; i += 1) {
      if (client.myGroups[Object.keys(client.myGroups)[i]] === 2) {
        client.respondToGroupInvite(Object.keys(client.myGroups)[i], false);
      }
    }
  }
};
