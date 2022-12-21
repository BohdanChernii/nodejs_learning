const nodemailer = require('nodemailer')
const {NO_REPLY_EMAIL, NO_REPLY_PASSWORD, FRONTEND_URL} = require("../config");
const emailTemplate = require('../email-template/index')
const ApiError = require("../error/error");
const path = require("path");
const hbs = require('nodemailer-express-handlebars');

module.exports = {
  sendMail: async (receiverMail, emailAction, context = {}) => {
    const transporter = nodemailer.createTransport({
        from: 'No Reply',
        service: 'gmail',
        auth: {
          user: NO_REPLY_EMAIL,
          pass: NO_REPLY_PASSWORD,
        }
      }
    )

    const templateInfo = emailTemplate[emailAction]

    if (!templateInfo.subject || !templateInfo.templateName) {
      throw new ApiError('wrong template', 500)
    }

    const options = {
      viewEngine: {
        defaultLayout: 'main',
        layoutDir: path.join(process.cwd(), 'email-template', 'layout'),
        partialDir: path.join(process.cwd(), 'email-template', 'partial'),
        extname: '.hbs'
      },
      extname: '.hbs',
      viewPath: path.join(process.cwd(), 'email-template', 'view')
    }

    transporter.use('compile',hbs(options))
    context.frontendURL = FRONTEND_URL

    return transporter.sendMail({
      to:receiverMail,
      subject:templateInfo.subject,
      template:templateInfo.templateName,
      context,
    })
  }
}

