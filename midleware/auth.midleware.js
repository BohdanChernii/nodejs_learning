const ApiError = require("../errror/error");
const validator = require("../validator/auth.validator")
const emailService = require('../service/email.service')
const authService = require('../service/auth.service')
const {FORGOT_PASS} = require("../enum/email-action.enum");
const Auth = require('../dataBase/Auth')
const ActionToken = require('../dataBase/ActionToken')
const OldPassword = require('../dataBase/OldPassword')
const tokenType = require('../enum/token.enum')
const {FORGOT_PASSWORD} = require("../enum/token-action.enum");
module.exports = {

  checkAccessToken: async (req, res, next) => {
    try {
      await emailService.sendEmail('bodiachernii@gmao;.com', FORGOT_PASS)
      const accessToken = req.get('Authorization')

      if (!accessToken) {
        throw new ApiError('No token', 404)
      }
      await authService.checkToken(accessToken)

      const tokenInfo = await Auth.findOne({accessToken})

      if (!tokenInfo) {
        throw new ApiError('Access token not found', 404)
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
        throw  new ApiError('No token', 404)
      }

      await authService.checkToken(refreshToken)

      const tokenInfo = await Auth.findOne({refreshToken})

      if (!tokenInfo) {
        throw new ApiError('Refresh token not found', 404)
      }

      req.tokenInfo = tokenInfo

      next()
    } catch (err) {
      next(err)
    }
  },

  isBodValid: async (req, res, next) => {
    try {
      const {body} = req

      const validate = validator.isLoginValid.validate(body)

      if (validate.error) {
        throw new ApiError(validate.error.message, 500)
      }

      next()
    } catch (err) {
      next(err)
    }
  },

  checkActionToken: async (req, res, next) => {
    try {
      const actionToken = req.get('Authorization')

      if (!actionToken) {
        throw new ApiError('No token', 404)
      }
      authService.checkToken(actionToken, FORGOT_PASSWORD)

      const tokenInfo = await ActionToken.findOne({
        token: actionToken,
        tokenType: FORGOT_PASSWORD,
      }).populate('_user_id')

      if (!tokenInfo) {
        throw  new ApiError('Action token not found', 409)
      }
      req.user = tokenInfo._user_id
      next()
    } catch (err) {
      next(err)
    }
  },

  checkOldPassword: async (req, res, next) => {
    try {
      const {user, body} = req

      const oldPasswords = await OldPassword.find({_user_id: user._id}).lean()

      if (!oldPasswords.length) {
        next()
      }

      const results = await Promise.all(oldPasswords.map((record) => authService.compareOldPasswords(record.password, body.password)))

      const condition = results.some((res) => res)
      if (condition) {
        throw new ApiError('This is old password', 400)
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}