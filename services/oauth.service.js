const bcrypt = require('bcrypt')
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken")

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),

  comparePasswords: async (hashPassword, password) => {
    const isPasswords = await bcrypt.compare(password, hashPassword)
    if (!isPasswords) {
      throw new ApiError('Wrong email or password')
    }
  },
  generateAccessTokenPair: (dataToSign = {}) => {
    const accessToken = jwt.sign(dataToSign,'Bohdan',{expiresIn:'15m'})
    const refreshToken = jwt.sign(dataToSign,'Cherniy',{expiresIn:'2d'})
    return {
      accessToken,
      refreshToken
    }
  }
}