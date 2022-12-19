const bcrypt = require('bcrypt')
const ApiError = require("../error/error");
const jwt = require('jsonwebtoken')
const {ACCESS_SECRET, REFRESH_SECRET} = require('../config/index')
const tokenType = require('../config/token.action')
const {string} = require("joi");
const tokenTypeEnum = require('../eum/token.enum')
const {CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET, FORGOT_PASSWORD_ACTION_TOKEN_SECRET} = require('../config/index')
module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),

  comparePassword: (password, hashPassword) => {
    const isPasswordSame = bcrypt.compare(password, hashPassword)
    if (!isPasswordSame) {
      throw new ApiError('Wrong email or password', 409)
    }
  },

  compareOldPasswords: (password, hashPassword) => bcrypt.compare(password, hashPassword),

  generateAccessToken: (dataToSign = {}) => {
    const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '1d'})
    const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  },

  generateActionToken: (actionType, dataToSign) => {
    let secret = ''
    switch (actionType) {
      case tokenType.CONFIRM_ACTION:
        secret = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET
        break
      case tokenType.FORGOT_PASSWORD:
        secret = FORGOT_PASSWORD_ACTION_TOKEN_SECRET
        break
    }

    return jwt.sign(dataToSign, secret, {expiresIn: '7d'})
  },

  checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
    try {
      let secret = ''
      if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS_SECRET
      else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH_SECRET

      jwt.verify(token, secret)
    } catch (err) {
      throw new ApiError('Token not valid', 401)
    }
  },

  checkActionToken: (token = '', actionType) => {
    try{
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
    }catch (err){
      throw new ApiError('Token not valid',401)
    }
  }

}