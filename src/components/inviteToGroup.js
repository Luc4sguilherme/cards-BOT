import main from '../config/main.js';
import log from './log.js';
import { client, community } from './steamClient.js';

export const userIsInTheGroup = (id64) =>
  new Promise((resolve, reject) => {
    community.getGroupMembers(main.steamGroup.ID, (error, members) => {
      if (error) {
        reject(
          new Error(
            `There was an error checking if the user is in the group: ${error}`
          )
        );
      } else {
        resolve(Array(members).includes(id64));
      }
    });
  });

export default (id64) => {
  userIsInTheGroup(id64)
    .then((status) => {
      if (!status) {
        client.inviteToGroup(id64, main.steamGroup.ID);
      }
    })
    .catch((error) => {
      log.error(error.message);
    });
};
