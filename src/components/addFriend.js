import log from './log.js';
import { client } from './steamClient.js';

export default (id64) => {
  client.addFriend(id64, (error) => {
    if (error) {
      log.error(error.message);
    } else {
      log.info(`Succesfully added ${id64} to friendlist.`);
    }
  });
};
