import colour from 'cli-color';
import moment from 'moment';

import main from '../config/main.js';
import { appendFileAsync } from './utils.js';

const formatDate = 'MM/DD/YYYY - HH:mm:ss,SSS ZZ';

const error = (data) => {
  const text = `${moment().format(formatDate)} @ [ ERROR ] ${data}`;

  if (main.log.error) {
    console.log(colour.redBright(text));
  }

  appendFileAsync(
    `./log/error/log-${moment().format('MM-DD-YYYY')}.txt`,
    `${text}\r\n`
  ).catch((err) => {
    console.error(err);
  });
};

const warn = (data) => {
  const text = `${moment().format(formatDate)} @ [ WARN ] ${data}`;

  if (main.log.warn) {
    console.log(colour.yellowBright(text));
  }

  appendFileAsync(
    `./log/warn/log-${moment().format('MM-DD-YYYY')}.txt`,
    `${text}\r\n`
  ).catch((err) => {
    error(err.message);
  });
};

const info = (data) => {
  const text = `${moment().format(formatDate)} @ [ INFO ] ${data}`;

  if (main.log.info) {
    console.log(colour.greenBright(text));
  }

  appendFileAsync(
    `./log/info/log-${moment().format('MM-DD-YYYY')}.txt`,
    `${text}\r\n`
  ).catch((err) => {
    error(err.message);
  });
};

const userChat = (id64, data) => {
  const text = `${moment().format(
    formatDate
  )} @ [ USERCHAT ][ ${id64} ] ${data}`;

  if (main.log.userChat) {
    console.log(colour.whiteBright(text));
  }

  appendFileAsync(
    `./log/userChat/log-${moment().format('MM-DD-YYYY')}.txt`,
    `${text}\r\n`
  ).catch((err) => {
    error(err.message);
  });
};

const adminChat = (id64, data) => {
  const text = `${moment().format(
    formatDate
  )} @ [ ADMINCHAT ][ ${id64} ] ${data}`;

  if (main.log.adminChat) {
    console.log(colour.blackBright(text));
  }

  appendFileAsync(
    `./log/adminChat/log-${moment().format('MM-DD-YYYY')}.txt`,
    `${text}\r\n`
  ).catch((err) => {
    error(err.message);
  });
};

const tradeoffer = (data) => {
  const text = `${moment().format(formatDate)} @ [ TRADEOFFER ] ${data}`;

  if (main.log.tradeOffer) {
    console.log(colour.blueBright(text));
  }

  appendFileAsync(
    `./log/tradeOffer/log-${moment().format('MM-DD-YYYY')}.txt`,
    `${text}\r\n`
  ).catch((err) => {
    error(err.message);
  });
};

export default {
  error,
  warn,
  tradeoffer,
  info,
  userChat,
  adminChat,
};
