const { body, checkSchema, validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      var error = {
        location: location,
        param: param,
        message: msg,
        nestedErrors: nestedErrors,
      };
      return error;
    };
    const errors = validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      errors: errors.array(),
    });
  };
};

module.exports = { validate: validate };
