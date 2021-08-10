import bot from './components/bot.js';
import configs from './components/errorHandler/configs/index.js';

configs.validate();
bot.initialize();
