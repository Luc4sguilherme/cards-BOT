import Joi from 'joi';

import main from '../../../config/main.js';
import marketableGemsRates from '../../../config/rates/gems/marketable.js';
import noMarketableGemsRates from '../../../config/rates/gems/nomarketable.js';
import marketableTF2Rates from '../../../config/rates/tf2/marketable.js';
import noMarketableTF2Rates from '../../../config/rates/tf2/nomarketable.js';

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

  const schemaMarketableGemsRates = Joi.object({
    cards: Joi.object().keys({
      5: Joi.number().integer().positive().required(),
      6: Joi.number().integer().positive().required(),
      7: Joi.number().integer().positive().required(),
      8: Joi.number().integer().positive().required(),
      9: Joi.number().integer().positive().required(),
      10: Joi.number().integer().positive().required(),
      11: Joi.number().integer().positive().required(),
      12: Joi.number().integer().positive().required(),
      13: Joi.number().integer().positive().required(),
      14: Joi.number().integer().positive().required(),
      15: Joi.number().integer().positive().required(),
    }),
    foils: Joi.object().keys({
      5: Joi.number().integer().positive().required(),
      6: Joi.number().integer().positive().required(),
      7: Joi.number().integer().positive().required(),
      8: Joi.number().integer().positive().required(),
      9: Joi.number().integer().positive().required(),
      10: Joi.number().integer().positive().required(),
      11: Joi.number().integer().positive().required(),
      12: Joi.number().integer().positive().required(),
      13: Joi.number().integer().positive().required(),
      14: Joi.number().integer().positive().required(),
      15: Joi.number().integer().positive().required(),
    }),
  });

  const schemaNoMarketableGemsRates = Joi.object({
    cards: Joi.object().keys({
      5: Joi.number().integer().positive().required(),
      6: Joi.number().integer().positive().required(),
      7: Joi.number().integer().positive().required(),
      8: Joi.number().integer().positive().required(),
      9: Joi.number().integer().positive().required(),
      10: Joi.number().integer().positive().required(),
      11: Joi.number().integer().positive().required(),
      12: Joi.number().integer().positive().required(),
      13: Joi.number().integer().positive().required(),
      14: Joi.number().integer().positive().required(),
      15: Joi.number().integer().positive().required(),
    }),
    foils: Joi.object().keys({
      5: Joi.number().integer().positive().required(),
      6: Joi.number().integer().positive().required(),
      7: Joi.number().integer().positive().required(),
      8: Joi.number().integer().positive().required(),
      9: Joi.number().integer().positive().required(),
      10: Joi.number().integer().positive().required(),
      11: Joi.number().integer().positive().required(),
      12: Joi.number().integer().positive().required(),
      13: Joi.number().integer().positive().required(),
      14: Joi.number().integer().positive().required(),
      15: Joi.number().integer().positive().required(),
    }),
  });

  const schemaMarketableTF2Rates = Joi.object({
    cards: Joi.object().keys({
      5: Joi.number().integer().positive().required(),
      6: Joi.number().integer().positive().required(),
      7: Joi.number().integer().positive().required(),
      8: Joi.number().integer().positive().required(),
      9: Joi.number().integer().positive().required(),
      10: Joi.number().integer().positive().required(),
      11: Joi.number().integer().positive().required(),
      12: Joi.number().integer().positive().required(),
      13: Joi.number().integer().positive().required(),
      14: Joi.number().integer().positive().required(),
      15: Joi.number().integer().positive().required(),
    }),
    foils: Joi.object().keys({
      5: Joi.number().integer().positive().required(),
      6: Joi.number().integer().positive().required(),
      7: Joi.number().integer().positive().required(),
      8: Joi.number().integer().positive().required(),
      9: Joi.number().integer().positive().required(),
      10: Joi.number().integer().positive().required(),
      11: Joi.number().integer().positive().required(),
      12: Joi.number().integer().positive().required(),
      13: Joi.number().integer().positive().required(),
      14: Joi.number().integer().positive().required(),
      15: Joi.number().integer().positive().required(),
    }),
  });

  const schemaNoMarketableTF2Rates = Joi.object({
    cards: Joi.object().keys({
      5: Joi.number().integer().positive().required(),
      6: Joi.number().integer().positive().required(),
      7: Joi.number().integer().positive().required(),
      8: Joi.number().integer().positive().required(),
      9: Joi.number().integer().positive().required(),
      10: Joi.number().integer().positive().required(),
      11: Joi.number().integer().positive().required(),
      12: Joi.number().integer().positive().required(),
      13: Joi.number().integer().positive().required(),
      14: Joi.number().integer().positive().required(),
      15: Joi.number().integer().positive().required(),
    }),
    foils: Joi.object().keys({
      5: Joi.number().integer().positive().required(),
      6: Joi.number().integer().positive().required(),
      7: Joi.number().integer().positive().required(),
      8: Joi.number().integer().positive().required(),
      9: Joi.number().integer().positive().required(),
      10: Joi.number().integer().positive().required(),
      11: Joi.number().integer().positive().required(),
      12: Joi.number().integer().positive().required(),
      13: Joi.number().integer().positive().required(),
      14: Joi.number().integer().positive().required(),
      15: Joi.number().integer().positive().required(),
    }),
  });

  const { error: errorMain } = schemaMain.validate(main, {
    convert: false,
    abortEarly: false,
  });

  const { error: errorMarketableGemsRates } =
    schemaMarketableGemsRates.validate(marketableGemsRates, {
      convert: false,
      abortEarly: false,
    });

  const { error: errorNoMarketableGemsRates } =
    schemaNoMarketableGemsRates.validate(noMarketableGemsRates, {
      convert: false,
      abortEarly: false,
    });

  const { error: errorMarketableTF2Rates } = schemaMarketableTF2Rates.validate(
    marketableTF2Rates,
    {
      convert: false,
      abortEarly: false,
    }
  );

  const { error: errorNoMarketableTF2Rates } =
    schemaNoMarketableTF2Rates.validate(noMarketableTF2Rates, {
      convert: false,
      abortEarly: false,
    });

  if (errorMain) {
    const errors = errorMain.details.map((detail) => detail.message).join(', ');

    throw new Error(
      `There are errors in the main configuration file: ${errors}`
    );
  }

  if (errorMarketableGemsRates) {
    const errors = errorMarketableGemsRates.details
      .map((detail) => detail.message)
      .join(', ');

    throw new Error(
      `There are errors in the marketable gems rates configuration file: ${errors}.`
    );
  }

  if (errorNoMarketableGemsRates) {
    const errors = errorNoMarketableGemsRates.details
      .map((detail) => detail.message)
      .join(', ');

    throw new Error(
      `There are errors in the non-marketable gems rates configuration file: ${errors}.`
    );
  }

  if (errorMarketableTF2Rates) {
    const errors = errorMarketableTF2Rates.details
      .map((detail) => detail.message)
      .join(', ');

    throw new Error(
      `There are errors in the marketable TF2 rates configuration file: ${errors}.`
    );
  }

  if (errorNoMarketableTF2Rates) {
    const errors = errorNoMarketableTF2Rates.details
      .map((detail) => detail.message)
      .join(', ');

    throw new Error(
      `There are errors in the non-marketable TF2 rates configuration file: ${errors}.`
    );
  }
}

export default {
  validate,
};
