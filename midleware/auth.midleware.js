const {authValidator} = require('../validator/auth.validator')
const ApiError = require("../error/error");
const authService = require('../services/auth.service')
const Auth = require('../dataBase/Auth')
const tokenTypeEnum = require('../enum/token.type.enum')
const {FORGOT_PASSWORD} = require("../enum/token.action.enum");
const OldPassword = require('../dataBase/OldPassword')
const emailService = require('../services/email.service')
const {FORGOT_PASS} = require("../enum/email.action.enum");

module.exports = {
  isBodyValid: async (req, res, next) => {
    try {
      const validate = authValidator.validate(req.body)
      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }
      req.body = validate.value
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
        throw new ApiError('Action token not found', 401)
      }
      authService.checkToken(accessToken)
      const tokenInfo = Auth.findOne({accessToken})

      if (!tokenInfo) {
        throw new ApiError('Access token not valid', 400)
      }
      next()
    } catch (err) {
      next(err)
    }
  },
  checkRefreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.get('Authorization')
      if (!refreshToken) {
        throw new ApiError('Refresh token not found')
      }
      authService.checkToken(refreshToken, tokenTypeEnum.refreshToken)
      const tokenInfo = Auth.findOne({refreshToken})
      if (!tokenInfo) {
        throw new ApiError('Refresh token not valid', 400)
      }
      req.tokenInfo = tokenInfo
      next()
    } catch (err) {
      next(err)
    }
  },

  checkActionToken: async (req, res, next) => {
    try {
      const actionToken = req.get('Authorization')
      if (!actionToken) {
        throw new ApiError('No token', 401)
      }
      authService.checkActionToken(actionToken, FORGOT_PASSWORD)
      const tokenInfo = await Auth
        .findOne({token: actionToken, tokenType: FORGOT_PASSWORD})
        .populate('_user_id')

      req.user = tokenInfo._user_id
      next()
    } catch (err) {
      next(err)
    }
  },
  checkOldPassword: async (req, res, next) => {
    try {
      const {user, body} = req
      const oldPasswords = await OldPassword.findOne({_user_id: user._id}).lean()

      if (!oldPasswords.length) {
        return next()
      }

      const results = await Promise.all(oldPasswords.map(record => authService.compareOldPasswords(record.password, body.password)))

      const condition = results.some(res => res)
      if (condition) {
        throw new ApiError('This is old password', 409)
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}