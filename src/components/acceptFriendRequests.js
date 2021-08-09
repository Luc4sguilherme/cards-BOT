import addFriend from './addFriend.js';
import { client } from './steamClient.js';

export default () => {
  for (let i = 0; i < Object.keys(client.myFriends).length; i += 1) {
    if (client.myFriends[Object.keys(client.myFriends)[i]] === 2) {
      addFriend(Object.keys(client.myFriends)[i]);
    }
  }
};
