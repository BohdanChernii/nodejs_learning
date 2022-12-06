const OAuth = require('../dataBase/OAuth')

const {authService, emailService} = require('../service')
const {WELCOME} = require("../config/email-action.enum");

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
  }

}