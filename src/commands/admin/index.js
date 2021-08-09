import { isValidCommand } from '../../components/utils.js';
import authcode from './authcode/index.js';
import block from './block/index.js';
import cancel from './cancel/index.js';
import commands from './commands/index.js';
import depositCards from './deposit/cards/index.js';
import depositFoils from './deposit/foils/index.js';
import depositGems from './deposit/gems/index.js';
import depositPacks from './deposit/packs/index.js';
import depositTF from './deposit/tf2/index.js';
import die from './die/index.js';
import reload from './reload/index.js';
import restart from './restart/index.js';
import unblock from './unblock/index.js';
import unpack from './unpack/index.js';
import withdrawCards from './withdraw/cards/index.js';
import withdrawFoils from './withdraw/foils/index.js';
import withdrawGems from './withdraw/gems/index.js';
import withdrawPacks from './withdraw/packs/index.js';
import withdrawTF from './withdraw/tf2/index.js';

// eslint-disable-next-line consistent-return
export default (sender, msg) => {
  const input = msg.toUpperCase().split(' ')[0];

  if (isValidCommand(input, '!AUTHCODE | !2FA')) {
    authcode(sender);
  } else if (isValidCommand(input, '!BLOCK')) {
    block(sender, msg);
  } else if (isValidCommand(input, '!CANCEL')) {
    cancel(sender, msg);
  } else if (isValidCommand(input, '!ADMIN')) {
    commands(sender);
  } else if (isValidCommand(input, '!DEPOSITCARDS')) {
    depositCards(sender, msg);
  } else if (isValidCommand(input, '!DEPOSITFOILS')) {
    depositFoils(sender, msg);
  } else if (isValidCommand(input, '!DEPOSITGEMS')) {
    depositGems(sender, msg);
  } else if (isValidCommand(input, '!DEPOSITBOOSTER | !DEPOSITPACKS')) {
    depositPacks(sender, msg);
  } else if (isValidCommand(input, '!DEPOSITTF')) {
    depositTF(sender, msg);
  } else if (isValidCommand(input, '!DIE')) {
    die(sender);
  } else if (isValidCommand(input, '!RELOAD')) {
    reload(sender);
  } else if (isValidCommand(input, '!RESTART')) {
    restart(sender);
  } else if (isValidCommand(input, '!UNBLOCK')) {
    unblock(sender, msg);
  } else if (isValidCommand(input, '!UNPACK')) {
    unpack(sender);
  } else if (isValidCommand(input, '!WITHDRAWCARDS')) {
    withdrawCards(sender, msg);
  } else if (isValidCommand(input, '!WITHDRAWFOILS')) {
    withdrawFoils(sender, msg);
  } else if (isValidCommand(input, '!WITHDRAWGEMS')) {
    withdrawGems(sender, msg);
  } else if (isValidCommand(input, '!WITHDRAWBOOSTER | !WITHDRAWPACKS')) {
    withdrawPacks(sender, msg);
  } else if (isValidCommand(input, '!WITHDRAWTF')) {
    withdrawTF(sender, msg);
  } else {
    return 'unknow';
  }
};
