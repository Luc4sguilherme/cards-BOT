import { client } from './steamClient.js';

const chatMessage = (id64, msg) => {
  client.chatMessage(id64, msg);
};

export default chatMessage;
