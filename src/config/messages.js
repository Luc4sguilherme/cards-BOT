export default {
  welcome:
    '[EN] Welcome to my Trading Service, thank you for choosing me. Quick Start: Type !COMMANDS via SteamChat \n\n',

  help:
    'This is an exchange bot, you can easly trade your random cards, foil, and booster packs for gems! \n' +
    'If you want to sell only a specific card, booster pack or Foils card, send me an Trade offer following the current prices of the bot, use !rate to see. \n' +
    'If you want to sell all your inventory you can use the commands below. \n' +
    '• You may type !commands for the list of commands :)',

  request: '/me Processing your request, please hold...',
  loading: "I'm currently loading my inventory. Please try again later.",
  tradeHold:
    "Please make sure you don't have a trade hold. \n\n https://help.steampowered.com/en/wizard/HelpWhyCantITrade",

  support: {
    response: {
      admin: '/pre Username: {USERNAME} \nID64: {ID64} \nMessage: {MESSAGE}',
      user: 'Message sent to owner',
    },
    error: 'Please enter a message - example: !SUPPORT Hello bot owner',
  },

  trade: {
    message: {
      gems: 'Here are {GEMS} Gem(s).',
      everything: 'Here are {GEMS} gem(s) in exchange everything',
      cards: {
        0: 'Here are {CARDS} card(s).',
        1: 'Here are {GEMS} gem(s) in exchange {CARDS} card(s)',
      },
      tf: {
        0: 'Here are {KEYS} TF Key(s).',
        1: 'Here are {GEMS} gem(s) in exchange {KEYS} TF Key(s)',
      },
      packs: {
        0: 'Here are {PACKS} Booster Pack(s).',
        1: 'Here are {GEMS} gem(s) in exchange {PACKS} Booster Pack(s)',
      },
      keys: {
        0: 'Here are {KEYS} Key(s).',
        1: 'Here are {GEMS} gem(s) in exchange {KEYS} Key(s)',
      },
    },
    notifyAdmin: {
      all: {
        0: 'Trade completed with {CARDS} Card(s) received and {GEMS} Gem(s) sent. TradeID: {OFFERID}',
        1: 'Trade completed with {PACKS} Booster Pack(s) and {CARDS} Card(s) received and {GEMS} Gem(s) sent. TradeID: {OFFERID}',
      },
      cards:
        'Trade completed with {CARDS} Regular Card(s) received and {GEMS} Gem(s) sent. TradeID: {OFFERID}',
      foils:
        'Trade completed with {FOILS} foil Card(s) received and {GEMS} Gem(s) sent. TradeID: {OFFERID}',
      packs:
        'Trade completed with {PACKS} Booster Pack(s) received and {GEMS} Gem(s) sent. TradeID: {OFFERID}',
    },
    check: 'Please check your Trade and accept it to receive your Items.',
    done: {
      0: 'Trade completed successfully.',
      1: 'Thanks for trading. Have a nice day!',
    },
    counteroffer:
      'You tried to send a counter offer, trade will be canceled. TradeID:{OFFERID}',
    expired: 'Tradeoffer expired. TradeID:{OFFERID}',
    canceled: {
      0: 'Trade offer with ID:{OFFERID} canceled.',
      1: 'The trade offer canceled because the items were not available. TradeID:{OFFERID}',
    },
    declined: {
      us: 'Tradeoffer declined. TradeID:{OFFERID}',
      them: 'You declined the Tradeoffer. TradeID:{OFFERID}',
    },
    accepted: 'The Tradeoffer has been accepted. TradeID:{OFFERID}',
    escrow: `Tradeoffer aborted because user is in escrow and can't trade. TradeID:{OFFERID}`,
  },

  error: {
    getoffer:
      'An error occurred while getting your offers. Please try again later!',
    canceloffer:
      'An error occurred while canceling your offers. Please try again later!',
    nonexistentoffer:
      'Offer with ID:{OFFERID} is not active, so it may not be cancelled.',
    inputinvalid: {
      cards: 'Please provide a valid amount of cards - example: {command}',
      keys: 'Please provide a valid amount of keys - example: {command}',
      gems: 'Please provide a valid amount of gems - example: {command}',
      offerid: 'Please enter a valid offerID - example: {command}',
      foils:
        'Please provide a valid amount of foils cards - example: {command}',
      packs:
        'Please provide a valid amount of booster pack - example: {command}',
      steamid64: 'Please provide a valid SteamID64',
    },
    commandUnknow:
      'Command not recognized. Use !COMMANDS to see how this bot works.',
    commandUnknowAdmin:
      'Command not recognized. Use !COMMANDS OR !ADMIN to see how this bot works.',
    privateinventory:
      'There was an error loading your inventory as it is private. Set your profile to public and try again',

    loadinventory: {
      them: 'An error occurred while loading your inventory. Please try later',
      me: "An error occurred while loading the bot's inventory. Please try later.",
    },

    outofstock: {
      anything: {
        them: 'Unfortunately, you currently do not have anything i can request.',
        me: "I don't have anything to complete this request.",
      },
      cards: {
        them: 'Unfortunately, you currently do not have enough regular cards to complete this request.',
        me: "I don't have enough foils cards to complete this request.",
      },
      foils: {
        them: 'Unfortunately, you currently do not have enough foils cards to complete this request.',
        me: "I don't have enough foils cards to complete this request.",
      },
      keys: {
        them: 'Unfortunately, you currently do not have enough keys to complete this request.',
        me: "I don't have enough keys to complete this request.",
      },
      gems: {
        them: 'Unfortunately, you currently do not have enough gems to complete this request.',
        me: "I don't have enough gems to complete this request.",
      },
      booster: {
        them: 'Unfortunately, you currently do not have enough booster packs to complete this request.',
        me: "I don't have enough Booster Pack to complete this request.",
      },
    },

    tradehold:
      'An error occurred while getting your trade holds. Make sure you have no trade hold. Please try again!',
    sendtrade:
      'An error occurred while sending your trade. Steam Trades could be down. Please try again later.',
    unpack: "The bot don't have Booster Pack.",
  },

  unpack: 'Unpacked {BOOSTER} Booster Pack.',

  block: {
    error: 'An error occurred while blocking user.',
    response: 'User has been blocked.',
    notallowed: "The bot can't block you.",
  },

  unblock: {
    error: 'An error occurred while unblocking user.',
    response: 'User has been unblocked.',
    notallowed: "The bot can't unblock you.",
  },
  spam: {
    level_1: "Please don't spam me.",
    level_2: 'You have been removed for spamming.',
    adminNotification:
      'User #{STEAMID64} has been removed for spamming. To block him use !block {STEAMID64}',
  },

  inactive:
    'Hi, you have been inactive on my friends list for too long. If you wish to use this bot again re-add it.',

  commands:
    'Commands: \n' +
    '• !help - Useful information \n' +
    '• !owner - display my owners steam profile, if you have any major issues you can contact my owner! \n' +
    '• !bots - display our full list of available bots. \n\n' +
    '• !stats - show how much gems available the bot have \n' +
    '• !prices - show our current rates \n\n' +
    '• !sellcheck - shows how many available cards/foils/packs you have, and how much gems you would get. \n' +
    '• !sellall - exchange everything you have available to sell for gems, following bot rates \n\n' +
    '• !sellcards - exchange your regular cards for gems, following bot rates. \n' +
    '• !sellfoils -  exchange your foil cards for gems, following bot rates. \n' +
    '• !sellpacks -  exchange your booster packs for gems, following bot rates. \n',

  adminCommands: [
    'Commands: \n',
    '► !RELOAD = Reload Inventory. \n',
    '► !AUTHCODE = Shows auth code. \n',
    '► !DIE = Turn off the bot. \n',
    '► !RESTART = Restart the bot. \n',
    '► !CANCEL (OFFERID) = Cancel the trade offer. \n',
    '► !UNPACK = Unpack all boosters. \n',
    '► !BLOCK (ID64) = Block user. \n',
    '► !UNBLOCK (ID64) = Unlock user. \n',
    '► !WITHDRAWCARDS = Withdraw a specific amount of regular cards. \n',
    '► !WITHDRAWFOILS = Withdraw a specific amount of foil cards. \n',
    '► !WITHDRAWBOOSTER = Withdraw a specific amount of booster packs. \n',
    '► !WITHDRAWTF = Withdraw a specific amount of hydra keys. \n',
    '► !WITHDRAWGEMS = Withdraw a specific amount of gems. \n',
    '► !DEPOSITCARDS = Deposits a specific amount of regular cards. \n',
    '► !DEPOSITFOILS = Deposits a specific amount of foil cards. \n',
    '► !DEPOSITBOOSTER = Deposits a specific amount of booster packs. \n',
    '► !DEPOSITTF = Deposits a specific amount of tf2 keys. \n',
    '► !DEPOSITGEMS = Deposits a specific amount of gems. \n',
  ],

  rates:
    'Currently, prices are: \n\n - Regular Cards \n {regular_cards} - Foil Cards \n {foil_cards} - Booster Packs \n {booster_pack}',

  stock: 'I currently have: \n  • {GEMS} Gem(s) \n  • {KEYS} TF2 Key(s) \n',
};
