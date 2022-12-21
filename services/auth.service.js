const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
  ACCESS_SECRET,
  REFRESH_SECRET,
  CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET,
  FORGOT_PASSWORD_ACTION_TOKEN_SECRET
} = require("../config");
const ApiError = require("../error/error");
const tokenTypeEnum = require("../enum/token.type.enum")
const tokenActionEnum = require("../enum/token.action.enum")
module.exports = {

  hashPassword: (password) => bcrypt.hash(password, 10),

  comparePasswords: async (hashPassword, password) => {
    const isPasswordsSame = await bcrypt.compare(password, hashPassword)
    if (!isPasswordsSame) {
      throw new ApiError('Wrong email or password', 400)
    }
  },

  compareOldPasswords: (hashPassword, password) => bcrypt.compare(password, hashPassword),

  generateAccessToken: (dataToSign = {}) => {
    const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '1d'})
    const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '7d'})
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
      jwt.verify(token, secret)
    } catch (err) {
      throw  new ApiError('Token not valid', 401)
    }
  },

  generateActionToken: (actionType, dataToSign = {}) => {
    let secret = ''
    switch (actionType) {
      case tokenActionEnum.CONFIRM_ACCOUNT:
        secret = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET
        break
      case tokenActionEnum.FORGOT_PASSWORD:
        secret = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
        break
    }
    return jwt.sign(dataToSign, secret, {expiresIn: '7d'})
  },

  checkActionToken: (token, actionType) => {
    try {
      let secret = ''
      switch (actionType) {
        case tokenActionEnum.CONFIRM_ACCOUNT:
          secret = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET
          break
        case tokenActionEnum.FORGOT_PASSWORD:
          secret = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
          break
      }
      jwt.verify(token, secret)
    } catch (err) {
      throw new ApiError('Action token not valid', 401)
    }
  }

}


