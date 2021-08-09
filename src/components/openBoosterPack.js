import { community } from './steamClient.js';

export default (appid, itemid) =>
  new Promise((resolve, reject) => {
    community.openBoosterPack(appid, itemid, (error) => {
      if (error) {
        reject(new Error(`There was an error unpacking Booster: ${error}`));
      } else {
        resolve();
      }
    });
  });
