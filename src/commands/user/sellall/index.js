import chatMessage from '../../../components/chatMessage.js';
import isAcceptedCurrency from '../../../components/isAcceptedCurrency.js';
import messages from '../../../config/messages.js';
import sellallgems from './gems/index.js';
import sellalltf from './tf/index.js';

export default (sender, msg) => {
  const input = msg.toUpperCase().replace(/>/g, '').replace(/</g, '');
  const command = input.match('!SELLALL') || [];
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
    sellallgems(sender, currency);
  }

  if (currency === 'TF2') {
    sellalltf(sender, currency);
  }
};
