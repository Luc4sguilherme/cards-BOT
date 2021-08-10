import Joi from 'joi';

import main from '../../../config/main.js';
import rates from '../../../config/rates.js';

function validate() {
  const schemaMain = Joi.object().keys({
    userName: Joi.string().required(),
    passWord: Joi.string().required(),
    sharedSecret: Joi.string().required(),
    identitySecret: Joi.string().required(),
    botName: Joi.string().allow(''),
    owner: Joi.string().uri().required(),
    admins: Joi.array().min(1).items(Joi.string().required()),
    botList: Joi.array().min(1).items(Joi.string()),
    maxInactiveDays: Joi.number().default(30).required(),
    steamGroup: Joi.object().keys({
      doInvites: Joi.boolean().required(),
      ID: Joi.string().required(),
      refuseInvites: Joi.boolean().required(),
    }),
    log: Joi.object().keys({
      warn: Joi.boolean().required(),
      error: Joi.boolean().required(),
      info: Joi.boolean().required(),
      userChat: Joi.boolean().required(),
      adminChat: Joi.boolean().required(),
      tradeOffer: Joi.boolean().required(),
    }),
  });

  const schemaRates = Joi.object({
    gems: {
      5: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      6: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      7: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      8: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      9: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      10: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      11: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      12: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      13: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      14: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      15: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
    },
    tf: {
      5: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      6: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      7: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      8: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      9: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      10: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      11: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      12: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      13: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      14: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
      15: Joi.object().keys({
        regularCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        foilCards: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
        boosterPacks: Joi.object().keys({
          marketable: Joi.number().integer().positive().required(),
          nomarketable: Joi.number().integer().positive().required(),
        }),
      }),
    },
  });

  const { error: errorMain } = schemaMain.validate(main, {
    convert: false,
    abortEarly: false,
  });

  const { error: errorRates } = schemaRates.validate(rates, {
    convert: false,
    abortEarly: false,
  });

  if (errorMain) {
    const errors = errorMain.details.map((detail) => detail.message).join(', ');

    throw new Error(
      `There are errors in the main configuration file: ${errors}`
    );
  }

  if (errorRates) {
    const errors = errorRates.details
      .map((detail) => detail.message)
      .join(', ');

    throw new Error(
      `There are errors in the rates configuration file: ${errors}.`
    );
  }
}

export default {
  validate,
};
