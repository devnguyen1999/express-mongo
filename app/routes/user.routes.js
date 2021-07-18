const {body, checkSchema, validationResult} = require('express-validator');
const { verifySignUp, verifyLogIn } = require("../middlewares");
const controller = require("../controllers/user.controller");
const validate = require('../middlewares/validate');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "X-Access-Token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user/sign-up",
    validate(verifySignUp),
    controller.signUp
  );
  app.post(
    "/api/user/log-in",
    validate(verifyLogIn),
    controller.logIn
  );
};
