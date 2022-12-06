const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const ApiError = require('../error/ApiError')

const {tokenTypeEnum} = require('../enum')

const {ACCESS_TOKEN, REFRESH_TOKEN, ACCESS_SECRET, REFRESH_SECRET} = require('../config/user.config')

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),

  comparePasswords: async (hashPassword, password) => {
    const isPasswordsSame = await bcrypt.compare( password,hashPassword)
    if (!isPasswordsSame) {
      throw new ApiError('Wrong email or password', 400)
    }
  },

  generateAccessToken: (dataToSign = {}) => {
    const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '15s'})
    const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '30d'})

    return {
      accessToken,
      refreshToken
    }
  },


  checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
    try {
      let secret = ''
      
      if (tokenType === tokenType.accessToken) secret = ACCESS_TOKEN
      else if (tokenType === tokenType.refreshToken) secret = REFRESH_TOKEN

      return jwt.verify(token, secret)


    } catch (err) {
      throw new ApiError('Token not valid', 401)
    }
  }

}