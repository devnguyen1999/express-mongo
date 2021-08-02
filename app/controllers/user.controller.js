const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    restOfOptions = {
      to: user.email,
      subject: "Verify your account",
    };
    templateVars = {
      firstName: user.firstName,
      link: "link"
    }
    try {
      await sendMail({
        template: "verifyAccount",
        templateVars,
        ...restOfOptions,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Send mail fail.");
    }
    res.send({ message: "User was registered successfully." });
  });
};

exports.logIn = (req, res) => {
  res.send({ message: "Ok." });
};
