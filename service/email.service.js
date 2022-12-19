const nodeMailer = require('nodemailer')
const emailTemplate = require('../email-template')
const nodemailer = require('nodemailer')
const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../config/user')
const ApiError = require("../error/error");
const path = require("path")
const hbs = require('nodemailer-express-handlebars')
const {FRONTEND_URL} = require("../config");
module.exports = {
  sendMail: async (receiverMail, emailAction, context = {}) => {
    const transporter = nodemailer.createTransport({
      from: 'No Reply',
      service: 'gmail',
      auth: {
        user: 'b.cherniy@nltu.lviv.ua' || NO_REPLY_EMAIL,
        pass: 'tvbbhaflfaijzyhm' || NO_REPLY_EMAIL_PASSWORD
      }
    })
    const templateInfo = emailTemplate[emailAction]

    if (!templateInfo?.subject || !templateInfo.templateName) {
      throw new ApiError('Wrong template', 500)
    }

    const options = {
      viewEngine: {
        defaultLayout: "main",
        layoutDir: path.join(process.cwd(), 'email-templates', 'layout'),
        partialsDir: path.join(process.cwd(), 'email-templates', 'partial'),
        extname: '.hbs'
      },
      extName: '.hbs',
      viewPath: path.join(process.cwd(), 'email-templates', 'view')
    }

    transporter.use('compile',hbs(options))
    context.frontedURL = FRONTEND_URL
    return transporter.sendMail({
      to:receiverMail,
      subject:templateInfo.subject,
      template:templateInfo.templateName,
      context
    })
  },
}