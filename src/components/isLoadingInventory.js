import { playLoading } from './playLoading.js';

export default (msg) => {
  if (playLoading.loading) {
    const message = msg.toUpperCase();

    if (
      message.indexOf('!SELLALL') !== -1 ||
      message.indexOf('!SELLCARDS') !== -1 ||
      message.indexOf('!SELLFOILS') !== -1 ||
      message.indexOf('!SELLPACKS') !== -1 ||
      message.indexOf('!SELLCHECK') !== -1 ||
      message.indexOf('!STATS') !== -1 ||
      message.indexOf('!STOCK') !== -1 ||
      message.indexOf('!WITHDRAWCARDS') !== -1 ||
      message.indexOf('!WITHDRAWFOILS') !== -1 ||
      message.indexOf('!WITHDRAWGEMS') !== -1 ||
      message.indexOf('!WITHDRAWPACKS') !== -1 ||
      message.indexOf('!WITHDRAWTF') !== -1 ||
      message.indexOf('!DEPOSITCARDS') !== -1 ||
      message.indexOf('!DEPOSITFOILS') !== -1 ||
      message.indexOf('!DEPOSITGEMS') !== -1 ||
      message.indexOf('!DEPOSITPACKS') !== -1 ||
      message.indexOf('!DEPOSITTF') !== -1 ||
      message.indexOf('!RELOAD') !== -1
    ) {
      return true;
    }
  }

  return false;
};
