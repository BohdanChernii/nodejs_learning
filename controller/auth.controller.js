const OAuth = require('../dataBase/OAuth')

const {authService, emailService} = require('../service')
const {WELCOME, FORGOT_PASS,} = require("../config/email-action.enum");
const {FORGOT_PASSWORD} = require('../config/token-action.enum')
const {FRONTEND_URL} = require("../config/user.config");
const User = require('../dataBase/User')
const ActionToken = require('../dataBase/ActionToken')

module.exports = {
  login: async (req, res, next) => {
    try {

      const {user, body} = req


      await emailService.sendMil('bodiachernii@gmail.com' || user.email, WELCOME, {userName: user.name})

      await authService.comparePasswords(user.password, body.password)

      const tokenPair = authService.generateAccessToken({_id: user.id})

      await OAuth.create({...tokenPair, _user_id: user._id})

      res.json({
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
      await OAuth.deleteOne({refreshToken})
      const tokenPair = authService.generateAccessToken({id: _user_id})
      await OAuth.create({...tokenPair, _user_id})

      res.status(201).json(tokenPair)

      next()
    } catch (err) {
      next(err)
    }
  },

  logout: async (req, res, next) => {
    try {
      console.log(req.tokenInfo);
      const {accessToken} = req.tokenInfo

      await OAuth.deleteOne({accessToken})

      res.sendStatus(204)

    } catch (err) {

      next(err)
    }
  },

  logoutAll: async (req, res, next) => {
    try {

      const {accessToken} = req.tokenInfo

      await OAuth.deleteMany({accessToken})

      res.sendStatus(204)

    } catch (err) {
      next(err)
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const user = req.user

      const actionToken = authService.generateActionType(FORGOT_PASSWORD, {email: user.email})
      const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`

      await  ActionToken.create({token:actionToken,_user_id:user._id,tokenType:FORGOT_PASSWORD})

      await emailService.sendMil('bohdanchernii@gmail.com', FORGOT_PASS, {url: forgotPassFEUrl})

      res.json('ok')
      next()
    } catch (err) {

      next(err)
    }
  },

  forgotPasswordAfterForgot: async (req, res, next) => {
    try {
      const hashPassword = await authService.hashPassword(req.body.password)

      await ActionToken.deleteOne({token:req.get('Authorization')})
      await User.updateOne({_id: req.user.id}, {password: hashPassword})
      
      res.json('Ok')
      next()
    } catch (err) {
      next(err)
    }
  }

}