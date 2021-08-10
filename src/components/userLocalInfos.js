import _ from 'lodash';
import moment from 'moment';

import { readFileAsync, writeFileAsync } from './utils.js';

export const getUserData = async (id64) => {
  try {
    const users = JSON.parse(await readFileAsync('./data/users.json'));
    const user = users[id64];

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const removeUserData = async (id64) => {
  try {
    const users = JSON.parse(await readFileAsync('./data/users.json'));

    delete users[id64];

    await writeFileAsync('./data/users.json', JSON.stringify(users));
  } catch (error) {
    throw new Error(error);
  }
};

export const registerDateMsg = async (id64) => {
  try {
    const currentDate = String(moment(new Date()).toISOString());
    const user = {
      [id64]: { dateOfLastMsg: currentDate },
    };

    const users = JSON.parse(await readFileAsync('./data/users.json'));
    const newObject = _.mergeWith({}, users, user);

    await writeFileAsync('./data/users.json', JSON.stringify(newObject));
  } catch (error) {
    throw new Error(error);
  }
};
