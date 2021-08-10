import chatMessage from '../../../components/chatMessage.js';
import isAcceptedCurrency from '../../../components/isAcceptedCurrency.js';
import messages from '../../../config/messages.js';
import sellpacksgems from './gems/index.js';
import sellpackstf from './tf/index.js';

export default (sender, msg) => {
  const input = msg.toUpperCase().replace(/>/g, '').replace(/</g, '');
  const command = input.match('!SELLPACKS') || [];
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
    sellpacksgems(sender, currency);
  }

  if (currency === 'TF2') {
    sellpackstf(sender, currency);
  }
};
