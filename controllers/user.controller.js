const {userService, oauthService} = require('../services')
const User = require('../dataBase/User')

module.exports = {

  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      next(err)
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await userService.findOneByParams()
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },

  createUser: async (req, res, next) => {

    try {
      const hashPassword = await oauthService.hashPassword(req.body.password)
      const userInfo = req.body
      const user = await userService.create({...userInfo, password: hashPassword})
      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const newUserInfo = req.body
      const {userId} = req.params
      const user = await userService.updateOne(userId, newUserInfo)
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.delete(userId)
      res.status(204).json('User Deleted')
    } catch (err) {
      next(err)
    }
  }

}