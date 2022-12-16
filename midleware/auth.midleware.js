const authService = require('../service/auth.service')
const emailService = require('../service/email.service')
const authValidator = require('../validator/auth.validator')
const {FORGOT_PASS} = require("../config/email-action.enum");
const ApiError = require("../error/error");
const Auth = require('../dataBase/Auth')
const OldPassword = require('../dataBase/OldPassword')
const tokenPair = require('../enum/token-type.enum')
const {FORGOT_PASSWORD} = require("../config/token-action.enum");
const ActionToken = require('../dataBase/ActionToken')

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
        throw new ApiError('Access token not found', 400)
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
      const refreshToken = req.get('Authorization')

      if (!refreshToken) {
        throw new ApiError('Refresh token not found', 400)
      }

      authService.checkToken(refreshToken, tokenPair.refreshToken)

      const tokenInfo = await Auth.findOne({refreshToken})

      if (!tokenInfo) {
        throw new ApiError('Access token not valid', 401)
      }
      req.tokenInfo = tokenInfo

    } catch (err) {
      next(err)
    }
  },
  checkActionType: async (req, res, next) => {
    try {
      const accessToken = req.get('Authorization')

      if (!accessToken) {
        throw new ApiError('No token', 401)
      }

      authService.checkToken(accessToken, FORGOT_PASSWORD)

      const tokenInfo = await ActionToken
        .findOne({token: accessToken, type: FORGOT_PASSWORD})
        .populate('_user_id')

      if (!tokenInfo) {
        throw new ApiError('Action token not valid', 401)
      }
      req.tokenInfo = tokenInfo

    } catch (err) {
      next(err)
    }
  },

  checkOldPasswords: async (req, res, next) => {
    try {
      const {user, body} = req.user
      const oldPasswords = await OldPassword.find({_user_id: user._id},{_id:0}).lean().projection('password')

      if (!oldPasswords.length) {
        return next()
      }

      const results = await Promise.all(
        oldPasswords.map(async (record) => authService.compareOldPasswords(record.password, body.password)))

      // const condition = oldPasswords.some((record) =>{
      //   console.log(authService.compareOldPasswords(record.password, body.password));
      //   return  authService.compareOldPasswords(record.password, body.password)
      // })

      console.log(results);
      const condition = results.some((res)=>res)


      if (condition) {
        throw new ApiError('This is old password', 409)
      }

      next()
    } catch (err) {
      next(err)
    }
  }

}