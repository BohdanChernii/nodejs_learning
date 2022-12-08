const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const ApiError = require('../error/ApiError')

const {tokenTypeEnum} = require('../enum')

const {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ACCESS_SECRET,
  REFRESH_SECRET,
  CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET, FORGOT_PASSWORD_ACTION_TOKEN_SECRET
} = require('../config/user.config')
const {FORGOT_PASS} = require("../config/email-action.enum");
const tokenTypes = require("../config/token-action.enum")
module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),

  comparePasswords: async (hashPassword, password) => {
    const isPasswordsSame = await bcrypt.compare(password, hashPassword)
    if (!isPasswordsSame) {
      throw new ApiError('Wrong email or password', 400)
    }
  },

  generateAccessToken: (dataToSign = {}) => {
    const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '1d'})
    const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '30d'})

    return {
      accessToken,
      refreshToken
    }
  },

  generateActionType: (actionType, daToSign = {}) => {
    let secret = ''

    switch (actionType) {
      case tokenTypes.CONFIRM_ACTION:
        secret = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET
        break
      case tokenTypes.FORGOT_PASSWORD:
        secret = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
        break
    }

    return jwt.sign(daToSign, secret, {expiresIn: '7d'})

  },


  checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
    try {
      let secret = ''

      if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS_SECRET
      else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH_SECRET

      console.log(ACCESS_TOKEN);
      return jwt.verify(token, secret)


    } catch (err) {

      throw new ApiError('Token not valid ', 401)
    }
  },

  checkActionToken: (token, actionType) => {
    let secret = ''

    switch (actionType) {
      case tokenTypes.CONFIRM_ACTION:
        secret = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET
        break
      case tokenTypes.FORGOT_PASSWORD:
        secret = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
        break
    }
    jwt.verify(token, secret)
  }
}