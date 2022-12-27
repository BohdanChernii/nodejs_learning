const emailService = require('../service/email.service')
const authService = require('../service/auth.service')
const {sendSms} = require('../service/sms.service')
const {WELCOME, FORGOT_PASS} = require("../enum/email-action.enum");
const User = require('../dataBase/User')
const Auth = require('../dataBase/Auth')
const ActionToken = require('../dataBase/ActionToken')
const OldPassword = require('../dataBase/OldPassword')
const {FORGOT_PASSWORD} = require("../enum/token-action.enum");
const {FRONTEND_URL} = require("../config");
const smsType = require('../helper/sms.helper')
module.exports = {
  login: async (req, res, next) => {
    try {
      const {user, body} = req
      await Promise.allSettled([
        await emailService.sendEmail('bodiachernii@gmail.com' || user.email,
          WELCOME,
          {
            userName: user.name, array: [{number: 1}], condition: false
          }),
        await sendSms(smsType[WELCOME](user.name), '+380996510938')
      ])

      await authService.comparePasswords(user.password, body.password)

      const tokenPair = authService.generateAuthTokens({_id: user._id})

      await Auth.create({...tokenPair, _user_id: user._id})
      console.log(tokenPair);
      res.json(
        {
          user,
          ...tokenPair
        }
      )

    } catch (err) {
      next(err)
    }
  },

  refresh: async (req, res, next) => {
    try {
      const {refreshToken, _user_id} = req.tokenInfo
      console.log(refreshToken, _user_id);
      await Auth.deleteOne({refreshToken})

      const tokenPair = authService.generateActionToken({id: _user_id})

      await Auth.create({...tokenPair, _user_id})
      res.status(200).json(tokenPair)
    } catch (err) {
      next(err)
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const {_id, email, name} = req.user

      const actionToken = authService.generateActionToken(FORGOT_PASSWORD, {email: email})
      console.log(actionToken);
      const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`

      await ActionToken.create({token: actionToken, tokenType: FORGOT_PASSWORD, _user_id: _id})

      await emailService.sendEmail(
        email,
        FORGOT_PASS,
        {url: forgotPassFEUrl, userName: name})

      res.json('ok')
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

      res.json('ok')
    } catch (err) {
      next(err)
    }
  }

}