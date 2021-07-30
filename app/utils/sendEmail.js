const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");
const { convert } = require("html-to-text");
const juice = require("juice");
const config = require("../config/email.config");

const transporter = nodemailer.createTransport(config);

const sendMail = ({
  template: templateName,
  templateVars,
  ...restOfOptions // to & subject
}) => {
  const templatePath = `templates/${templateName}.html`;
  const options = {
    from: config.auth.user,
    ...restOfOptions, // to & subject
  };

  if (templateName && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, "utf-8");
    const html = ejs.render(template, templateVars);
    //const text = convert(html);
    const htmlWithStylesInlined = juice(html);

    options.html = htmlWithStylesInlined;
    //options.text = text;
  }

  return transporter.sendMail(options);
};

module.exports = {
  sendMail: sendMail,
};
