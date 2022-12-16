const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require("../error/error");
const {ACCESS_SECRET, REFRESH_SECRET} = require("../config/user.config");
const tokenType = require('../config/token-action.enum')
const tokenTypeEnum = require('../enum/token-type.enum')
const {CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET, FORGOT_PASSWORD_ACTION_TOKEN_SECRET} = require("../config");

module.exports = {

  hashPassword: (password) => bcrypt.hash(password, 10),

  comparePasswords: async (hashPassword, password) => {
    const isPasswordsSame = await bcrypt.compare( password,hashPassword)
    if (!isPasswordsSame) {
      throw  new ApiError('Wrong email or password', 409)
    }
  },

  compareOldPasswords:  (hashPassword,password) =>{
    return  bcrypt.compare(password, hashPassword)
  },

  generateAccessToken: (dataToSign = {}) => {
    const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '1d'})
    const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  },

  generateActionType: (actionType, dataToSign = {}) => {
    let secret = ''
    switch (actionType) {
      case tokenType.CONFIRM_ACTION:
        secret = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET
        break
      case tokenType.FORGOT_PASSWORD:
        secret = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
    }
    return jwt.sign(dataToSign, secret, {expiresIn: '7d'})
  },

  checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
    try {
      let secret = ''

      if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS_SECRET
      else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH_SECRET

      return jwt.verify(token, secret)
    } catch (err) {
      throw new ApiError('Token not valid', 401)
    }
  },

  checkActionType: (token, actionType) => {
    let secret = ''

    switch (actionType) {
      case tokenType.CONFIRM_ACTION:
        secret = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET
        break
      case tokenType.FORGOT_PASSWORD:
        secret = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
        break
    }

    jwt.verify(token, secret)
  }

}