const OAuth = require('../dataBase/OAuth')
const {userService, authService, emailService} = require('../service')
const ApiError = require('../error/ApiError')
const {tokenPair} = require('../enum')
const authValidator = require('../validator/auth.validator')
const {FORGOT_PASS} = require('../config/email-action.enum')

module.exports = {
  isBodyValid: async (res, req, next) => {
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
      await emailService.sendMil('bodiachernii@gmail.com', FORGOT_PASS)

      const accessToken = req.get('Authorization')
      console.log(accessToken);

      if (!accessToken) {
        throw new ApiError('Access token not found', 400)
      }

      authService.checkToken(accessToken)

      const tokenInfo = await OAuth.findOne({accessToken})


      if (!tokenInfo) {
        throw new ApiError('Access token not valid', 401)
      }

      req.tokenInfo = tokenInfo

      next()
    } catch (err) {
      next(err)
    }
  },


  checkRefreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.get('Authorization')
      if (!refreshToken) {
        throw new ApiError('Refresh token not found', 401)
      }

      authService.checkToken(refreshToken, tokenPair.refreshToken)

      const tokenInfo = await OAuth.findOne({refreshToken})

      if (!tokenInfo) {
        throw new ApiError('Token not valid', 401)
      }

      req.tokenInfo = tokenInfo


      next()

    } catch (err) {

      next(err)

    }
  }
}