const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const {NO_REPLY_EMAIL, NO_REPLY_PASSWORD, FRONTEND_URL} = require("../config");
const emailTemplate = require('../email-templates')
const ApiError = require("../errror/error");
const path = require('path')

const sendEmail = async (receiver, emailAction, context = {}) => {

  const transporter = nodemailer.createTransport({
    from: 'No reply',
    service: 'gmail',
    auth: {
      user: NO_REPLY_EMAIL,
      pass: NO_REPLY_PASSWORD
    }
  })

  const template = emailTemplate[emailAction]

  if (!template?.subject || !template.templateName) {
    throw new ApiError('Wrong template', 400)
  }
  const options = {
    viewEngine: {
      defaultLayout: 'main',
      layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
      partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
      extname: '.hbs'
    },
    extName: '.hbs',
    viewPath: path.join(process.cwd(), 'email-templates', 'views')
  }
  transporter.use('compile', hbs(options))
  context.frontendURL = FRONTEND_URL

  return transporter.sendMail({
    to: receiver,
    subject: template.subject,
    template: template.templateName,
    context
  })
}
module.exports = {
  sendEmail
}