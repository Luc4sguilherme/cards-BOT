import chatMessage from '../../../components/chatMessage.js';
import isAcceptedCurrency from '../../../components/isAcceptedCurrency.js';
import messages from '../../../config/messages.js';
import sellpricesgems from './gems/index.js';
import sellpricestf from './tf/index.js';

export default (sender, msg) => {
  const input = msg.toUpperCase().replace(/>/g, '').replace(/</g, '');
  const command =
    input.match('!PRICES') ||
    input.match('!PRICE') ||
    input.match('!RATES') ||
    input.match('!RATE') ||
    [];
  const currency = input.replace(`${command[0]}`, '').trim();

  if (!currency.length) {
    chatMessage(sender, messages.error.missingInput.currency);
    return;
  }

  if (!isAcceptedCurrency(currency)) {
    chatMessage(sender, messages.error.inputinvalid.currency);
    return;
  }

  if (currency === 'GEMS') {
    sellpricesgems(sender, currency);
  }

  if (currency === 'TF2') {
    sellpricestf(sender, currency);
  }
};
