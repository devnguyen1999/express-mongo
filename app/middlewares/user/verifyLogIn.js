const { body, checkSchema, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const db = require("../../models");
const User = db.user;

var verifyLogIn = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid email.",
    },
    custom: {
      options: (email) => {
        return new Promise((resolve, reject) => {
          User.findOne({ email: email }, (err, user) => {
            if (err) {
              reject(err);
            }
            if (!user) {
              reject("User does not exist.");
            } else {
              resolve();
            }
          });
        });
      },
    },
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters.",
    },
    custom: {
      options: (password, { req }) => {
        return new Promise((resolve, reject) => {
          User.findOne({ email: req.body.email }, (err, user) => {
            if (user.password !== bcrypt.hashSync(password, 8)) {
              reject("Incorrect password.");
            } else {
              resolve();
            }
          });
        });
      },
    },
  },
});

module.exports = verifyLogIn;
