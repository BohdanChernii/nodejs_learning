const OAuth = require('../dataBase/OAuth')
const {userService, authService} = require('../service')
const ApiError = require('../error/ApiError')
const {tokenPair} = require('../enum')
const OAuthValidator = require('../validator/auth.validator')

module.exports = {
  isBodyValid: async (res, req, next) => {

    try {
      const validate = OAuthValidator.loginValidator.validate(req.body)

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
      const accessToken = req.get('Authorization')
      if (!accessToken) {
        throw new ApiError('Access token not found', 400)
      }

      authService.checkToken(accessToken)

      const tokenInfo = await OAuth.findOne({accessToken})

      if(!tokenInfo){
        throw new ApiError('Access token not valid',401)
      }
      next()
    } catch (err) {
      next(err)
    }
  },
  checkRefreshToken: async (req,res,next)=>{
    try {
      const refreshToken = req.get('Authorization')
      if(!refreshToken){
        throw new ApiError('Refresh token not found',401)
      }

      authService.checkToken(refreshToken, tokenPair.refreshToken)

      const tokenInfo = await OAuth.findOne({refreshToken})

      if(!tokenInfo){
        throw new ApiError('Token not valid',401)
      }

      req.tokenInfo = tokenInfo
      next()

    }catch (err){

      next(err)

    }
  }
}