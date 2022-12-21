const authService = require('../services/auth.service')
const smsService = require('../services/sms.service')
const emailService = require('../services/email.service')
const Auth = require('../dataBase/Auth')
const ActionToken = require('../dataBase/ActionToken')
const OldPassword = require('../dataBase/OldPassword')
const User = require('../dataBase/User')
const {FORGOT_PASSWORD} = require("../enum/token.action.enum");
const {FRONTEND_URL} = require("../config");
const {FORGOT_PASS} = require("../enum/email.action.enum");
const smsActionTypeEnum = require('../enum/sms-action-type.enum')
const smsTemplate = require('../helper/sms-template-helper')

module.exports = {
  login: async (req, res, next) => {
    try {
      const {user, body} = req

      await Promise.allSettled([
        emailService.sendMail(user.email || 'bodiachernii@gmail.com', {userName: user.name, array: [{number: 1}], condition:false}),
        smsService.sendSms(smsTemplate[smsActionTypeEnum.WELCOME](user.name), user.phone)
      ])
      await user.compareOldPasswords(body.password)

      const tokenPair = authService.generateAccessToken({id: user._id})

      await Auth.create({...tokenPair, _user_id: user._id})
      req.join({
        user,
        ...tokenPair
      })
      next()
    } catch (err) {
      next(err)
    }
  },

  refresh: async (req, res, next) => {
    try {
      const {refreshToken, _user_id} = req.tokenInfo
      await Auth.deleteOne({refreshToken})
      const tokenPair = authService.generateAccessToken({id: _user_id})
      await Auth.create({...tokenPair, _user_id})
      res.status(201).json(tokenPair)
      next()
    } catch (err) {
      next(err)
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const {_id, email, name} = req.user

      const actionToken = authService.generateActionToken(FORGOT_PASSWORD, {email: email})
      const forgotPassFEURL = `${FRONTEND_URL}/password/new?token=${actionToken}`

      await ActionToken.create({token: actionToken, tokenType: FORGOT_PASSWORD, _user_id: _id})
      await emailService.sendMail(email, FORGOT_PASS, {url: forgotPassFEURL, userName: name})
      res.json('ok')
      next()
    } catch (err) {
      next(err)
    }
  },
  forgotPasswordAfterForgot: async (req, res, next) => {
    try {
      const {user, body} = req
      const hashPassword = await authService.hashPassword(body.password)
      await OldPassword.create({_user_id: user._id, password: user.password})
      await ActionToken.deleteOne({token: req.get('Authorization')})
      await User.updateOne({_id: user._id}, {password: hashPassword})
      res.json('Ok')
    } catch (err) {
      next(err)
    }

  }
}