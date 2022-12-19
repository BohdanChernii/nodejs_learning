const authValidator = require('../validator/auth.validator')
const ApiError = require("../error/error");
const emailService = require('../service/email.service')
const authService = require('../service/auth.service')
const {FORGOT_PASS} = require("../config/email.action.enum");
const {accessToken} = require("../eum/token.enum");
const Auth = require("../dataBase/Auth")
const tokenPair = require("../eum/token.enum");
const {FORGOT_PASSWORD} = require("../config/token.action");
const ActionToken = require('../dataBase/ActionToken')
const OldPassword = require('../dataBase/OldPassword')

module.exports = {

  isBodyValid: async (req, res, next) => {
    try {
      const validate = authValidator.loginValidator.validate(req.body)
      if (validate.error) {
        throw new ApiError(validate.error.message)
      }
      next()
    } catch (err) {
      next(err)
    }
  },

  checkAccessToken: async (req, res, next) => {
    try {
      await emailService.sendMail('bodiachernii@gmail.com', FORGOT_PASS)

      const accessToken = req.get('Authorization')

      if (!accessToken) {
        throw new ApiError('Action token not found', 400)
      }

      authService.checkToken(accessToken)

      const tokenInfo = await Auth.findOne({accessToken})
      if (!tokenInfo) {
        throw new ApiError('Access token not valid', 401)
      }
      req.tokenInfo = tokenInfo
    } catch (err) {
      next(err)
    }
  },
  checkRefreshToken: async (req, res, next) => {
    try {

      const {refreshToken} = req.get('Authorization')

      if (!refreshToken) {
        throw new ApiError('Refresh token not found', 400)
      }

      authService.checkToken(refreshToken, tokenPair.refreshToken)

      const tokenInfo = await Auth.findOne({refreshToken})

      if (!tokenInfo) {
        throw new ApiError('Access token not valid', 400)
      }
      req.tokenInfo = tokenInfo

    } catch (err) {
      next(err)
    }
  },
  checkActionToken: async (req, res, next) => {
    try {
      const accessToken = req.get('Authorization')

      if (!accessToken) {
        throw new ApiError('Action token not found', 400)
      }

      authService.checkToken(accessToken, FORGOT_PASSWORD)

      const tokenInfo = await ActionToken
        .find({token: accessToken, type: FORGOT_PASSWORD})
        .populate('_user_id')

      if (!tokenInfo) {
        throw new ApiError('Action token not valid', 401)
      }

      req.tokenInfo = tokenInfo
    } catch (err) {
      next(err)
    }
  },

  checkOldPassword: async (req, res, next) => {
    try {
      const {user, body} = req
      const oldPassword = await OldPassword.find({_user_id: user._id}, {_id: 0}).lean().projection('password')
      const results = await Promise.all(
        oldPassword.map(async (record) => authService.compareOldPasswords(body.password, record.password))
      )
      const condition = results.some(res => res)

      if(condition){
        throw new ApiError('This is old password',409)
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}