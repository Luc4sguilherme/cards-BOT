import { isValidCommand } from '../../components/utils.js';
import bots from './bots/index.js';
import commands from './commands/index.js';
import help from './help/index.js';
import owner from './owner/index.js';
import prices from './prices/index.js';
import sellall from './sellall/index.js';
import sellcards from './sellcards/index.js';
import sellcheck from './sellcheck/index.js';
import sellfoils from './sellfoils/index.js';
import sellpacks from './sellpacks/index.js';
import stats from './stats/index.js';
import support from './support/index.js';

// eslint-disable-next-line consistent-return
export default (sender, msg) => {
  const input = msg.toUpperCase().split(' ')[0];

  if (isValidCommand(input, '!BOTS')) {
    bots(sender);
  } else if (isValidCommand(input, '!COMMANDS')) {
    commands(sender);
  } else if (isValidCommand(input, '!HELP')) {
    help(sender);
  } else if (isValidCommand(input, '!STATS | !STOCK')) {
    stats(sender);
  } else if (isValidCommand(input, '!OWNER')) {
    owner(sender);
  } else if (isValidCommand(input, '!PRICES | !PRICE | !RATES | !RATE')) {
    prices(sender);
  } else if (isValidCommand(input, '!SELLALL')) {
    sellall(sender);
  } else if (isValidCommand(input, '!SELLCARDS')) {
    sellcards(sender);
  } else if (isValidCommand(input, '!SELLCHECK')) {
    sellcheck(sender);
  } else if (isValidCommand(input, '!SELLFOILS')) {
    sellfoils(sender);
  } else if (isValidCommand(input, '!SELLPACKS')) {
    sellpacks(sender);
  } else if (isValidCommand(input, '!SUPPORT')) {
    support(sender, msg);
  } else {
    return 'unknow';
  }
};
