const nodemailer = require('nodemailer')
const emailTemplate = require('../email-templates')
const EmailTemplate = require('email-templates')
const {NO_REPLY_EMAIL, NO_REPLY_PASSWORD, FRONTEND_URL, NO_REPLY_EMAIL_PASSWORD} = require('../config')
const path = require('path')
const ApiError = require("../error/error");
const hbs = require('nodemailer-express-handlebars');

const sendMail = async (receiverMail, emailAction, context = {}) => {

  const transporter = nodemailer.createTransport({

    from: 'No reply',
    service: 'gmail',
    auth: {
      user:'b.cherniy@nltu.lviv.ua'|| NO_REPLY_EMAIL,
      pass:'tvbbhaflfaijzyhm' || NO_REPLY_EMAIL_PASSWORD,
    }
  })

  // Object.assign(context || {}, {frontendURL: 'google.com'})

  const templateInfo = emailTemplate[emailAction]

  if (!templateInfo?.subject || !templateInfo.templateName) {
    throw new ApiError('Wrong template', 500)
  }

  const options = {
    viewEngine: {
      defaultLayout: 'main',
      layoutsDir: path.join(process.cwd(), 'email-templates', 'layout'),
      partialsDir: path.join(process.cwd(), 'email-templates', 'partial'),
      extname: '.hbs'
    },
    extName: '.hbs',
    viewPath: path.join(process.cwd(), 'email-templates', 'view')
  }

  transporter.use('compile', hbs(options))
  context.frontendURL = FRONTEND_URL

  return transporter.sendMail({
    to: receiverMail,
    subject: templateInfo.subject,
    template: templateInfo.templateName,
    context
  })
}

module.exports = {
  sendMail
}