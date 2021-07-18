const { body, checkSchema, validationResult } = require("express-validator");
const db = require("../../models");
const User = db.user;

var verifySignUp = checkSchema({
  firstName: { notEmpty: true, errorMessage: "First name can not be blank." },
  lastName: { notEmpty: true, errorMessage: "Last name can not be blank." },
  email: {
    isEmail: {
      errorMessage: "Invalid email.",
    },
    custom: {
      options: (email) => {
        return new Promise((resolve, reject) => {
          User.findOne({ email: email }, (err, user) => {
            if (user) {
              reject("Email is already in use.");
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
  },
});

module.exports = verifySignUp;
