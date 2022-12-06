const nodemailer = require('nodemailer')
const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../config/user.config')
const User = require('../dataBase/User')
const EmailTemplate = require('email-templates')
const emailTemplates = require('../email-templates')
const path = require('path')
const ApiError = require("../error/ApiError");

const sendMil = async (receiverMail, emailAction, locals = {}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: NO_REPLY_EMAIL,
      pass: NO_REPLY_EMAIL_PASSWORD,
    }
  })

  Object.assign(locals || {}, {frontendURL: 'google.com'})

  const templateInfo = emailTemplates[emailAction]

  if (!templateInfo) {
    throw new ApiError('Wrong template', 500)
  }

  const templateRenderer = new EmailTemplate({
    views: {
      root: path.join(process.cwd(), 'email-templates')
    }
  })


  const html = await templateRenderer.render(templateInfo.templateName, locals)

  return transporter.sendMail({
    from: 'Bohdan',
    to: receiverMail,
    subject: templateInfo.subject,
    html
  })
}

module.exports = {
  sendMil
}