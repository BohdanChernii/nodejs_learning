const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const ApiError = require("../errror/error");

const {
  ACCESS_SECRET,
  REFRESH_SECRET,
  CONFIG_ACCOUNT_ACTION_TOKEN_SECRET,
  FORGOT_PASSWORD_ACTION_TOKEN_SECRET
} = require("../config");

const tokenTypeEnum = require('../enum/token.enum')
const actionTypeEnum = require('../enum/token-action.enum')


module.exports = {
  hashPassword: async (password) => bcrypt.hash(password, 10),

  compareOldPasswords: (hashPassword, password) => bcrypt.compare(password, hashPassword),

  comparePasswords: async (hashPassword, password) => {
    const isPasswordsSame = await bcrypt.compare(password, hashPassword)
    if (!isPasswordsSame) {
      throw new ApiError('Wrong email or password')
    }
  },

  generateAuthTokens: (dataToSign = {}) => {
    const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '7d'})
    const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '14d'})
    return {
      accessToken,
      refreshToken
    }
  },

  checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
    try {
      let secret = ''
      if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS_SECRET
      else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH_SECRET
      return jwt.verify(token, secret)
    } catch (err) {
      throw new ApiError('Token not valid', 400)
    }
  },

  generateActionToken: ( actionType, dataToSign = {},) => {
    let secret = ''
    switch (actionType) {
      case actionTypeEnum.CONFIRM_ACCOUNT:
        secret = CONFIG_ACCOUNT_ACTION_TOKEN_SECRET
        break
      case actionTypeEnum.FORGOT_PASSWORD:
        secret = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
        break
    }
    console.log(actionType);
    return jwt.sign(dataToSign, secret, {expiresIn: '1d'})

  },

  checkActionToken: (token, actionType) => {
    try {
      let secret = ''
      switch (actionType) {
        case actionTypeEnum.CONFIRM_ACCOUNT:
          secret = CONFIG_ACCOUNT_ACTION_TOKEN_SECRET
          break
        case actionTypeEnum.FORGOT_PASSWORD:
          secret = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
          break
      }
      return jwt.verify(token, secret)
    } catch (err) {
      throw new ApiError('Action token not valid', 400)
    }

  }

}


