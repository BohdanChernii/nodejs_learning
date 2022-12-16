const authService = require('../service/auth.service')
const emailService = require('../service/email.service')
const Auth = require('../dataBase/Auth')
const {WELCOME, FORGOT_PASS} = require("../config/email-action.enum");
const {FORGOT_PASSWORD} = require("../config/token-action.enum");
const {FRONTEND_URL} = require("../config");
const ActionToken = require('../dataBase/ActionToken')
const User = require('../dataBase/User')
const {hashPassword} = require("../service/auth.service");
const OldPassword = require('../dataBase/OldPassword')

module.exports = {
  login: async (req, res, next) => {
    try {
      const {user, body} = req

      await emailService.sendMail('bodiachernii@gmail.com' || user.email, WELCOME, {
        userName: user.name,
        array: [{number: 1}, {number: 2}, {number: 3}],
        condition: false
      })

      await authService.comparePasswords(user.password, body.password)

      const tokenPair = authService.generateAccessToken({_id: user.id})

      await Auth.create({...tokenPair, _user_id: user._id})

      res.json({user, ...tokenPair})

    } catch (err) {
      next(err)
    }
  },

  refresh: async (req, res, next) => {
    try {
      const {refreshToken, _user_id} = req.tokenInfo
    } catch (err) {
      next(err)
    }
  },

  logout: async (req, res, next) => {
    try {
      const {accessToken} = req.tokenInfo

      await Auth.deleteOne({accessToken})

      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  },

  logoutAll: async (req, res, next) => {
    try {

      const {accessToken} = req.tokenInfo

      await Auth.deleteMany({accessToken})

      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  },

  forgotPass: async (req, res, next) => {
    try {
      const user = req.user

      const actionToken = authService.generateActionType(FORGOT_PASSWORD, {email: user.email})
      const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`

      await ActionToken.create({token: actionToken, _user_id: user._id, FORGOT_PASSWORD})

      await emailService.sendMail('bodiachernii@gmail.com', FORGOT_PASS, {url: forgotPassFEUrl})

      res.json('Ok')
    } catch (err) {
      next(err)
    }
  },

  forgotPassAfterForgot: async (req, res, next) => {
    try {
      const {user, body} = req

      const hashPassword = await authService.hashPassword(req.body.password)

      await OldPassword.create({_user_id:user._id, password:  user.password})

      await ActionToken.deleteOne({token: req.get('Authorization')})

      await User.updateOne({_id: req.user.id}, {password: hashPassword})
      res.json('Password updated')
    } catch (err) {
      next(err)
    }

  }
}