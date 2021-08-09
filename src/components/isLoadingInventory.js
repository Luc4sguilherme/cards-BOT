import { playLoading } from './playLoading.js';

export default (msg) => {
  if (playLoading.loading) {
    const message = msg.toUpperCase();

    if (
      message === '!SELLALL' ||
      message === '!SELLCARDS' ||
      message === '!SELLFOILS' ||
      message === '!SELLPACKS' ||
      message === '!STATS' ||
      message === '!STOCK' ||
      message === '!WITHDRAWCARDS' ||
      message === '!WITHDRAWFOILS' ||
      message === '!WITHDRAWGEMS' ||
      message === '!WITHDRAWPACKS' ||
      message === '!WITHDRAWTF' ||
      message === '!DEPOSITCARDS' ||
      message === '!DEPOSITFOILS' ||
      message === '!DEPOSITGEMS' ||
      message === '!DEPOSITPACKS' ||
      message === '!DEPOSITTF' ||
      message === '!RELOAD'
    ) {
      return true;
    }
  }

  return false;
};
