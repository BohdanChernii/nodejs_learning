const User = require('../dataBase/User')
const CustomError = require('../error/customError')
module.exports = {
  checkIfUserExist: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await User.findById(userId)
      if (!user) {
        throw new CustomError('This user is undefined!!!!', 404)
      }
      req.user = user
      next()
    } catch (err) {
      next(err)
    }
  },
  checkIsEmailUnique: async (req, res, next) => {
    try {
      const {email} = req.body
      const {userId} = req.params
      if (!email) {
        throw new CustomError('Email not present', 400)
      }
      const user = await User.findById(userId)

      if (user) {
        throw  new CustomError('User with this email already exists', 409)
      }

      next()
    } catch (err) {
      next(err)
    }
  }
}