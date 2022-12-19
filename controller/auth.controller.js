const authService = require('../service/auth.service')
const emailService = require('../service/email.service')
const Auth = require('../dataBase/Auth')
const {FORGOT_PASSWORD} = require("../config/token.action");
const {FRONTEND_URL} = require("../config");
const ActionToken = require('../dataBase/ActionToken')
const OldPassword = require('../dataBase/OldPassword')
const User = require('../dataBase/User')

module.exports = {
  login: async (req, res, next) => {
    try {
      const {body, user} = req

      await emailService.sendMail('bodiachernii@gmail.com', 'Welcome', {
        userName: user.name,
        array: [{number: 1}, {number: 2}, {number: 3}],
        condition: false
      })

      await user.comparePassword(body.password)
      // await authService.comparePassword(body.password, user.password)

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

      const {password} = req.body
      const {body, user} = req

      const actionToken = await authService.generateActionToken(FORGOT_PASSWORD, {email: user.email})
      const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`

      await ActionToken.create({token: actionToken, _user_id: user._id, FORGOT_PASSWORD})

      await emailService.sendMail('bodiachernii@gmail.com', FORGOT_PASSWORD, {url: forgotPassFEUrl})
      res.json('Ok')
    } catch (err) {
      next(err)
    }
  },

  forgotPassAfterForgot: async (req, res, next) => {
    try {
      const {user, body} = req

      const hashPassword = await authService.hashPassword(req.body.password)

      await OldPassword.create({_user_id: user._id, password: user.password})

      await ActionToken.deleteOne({token: req.get('Authorization')})

      await User.updateOne({_id: req.user.id}, {password: hashPassword})

      req.json('Password updated')
    } catch (err) {
      next(err)
    }
  }

}