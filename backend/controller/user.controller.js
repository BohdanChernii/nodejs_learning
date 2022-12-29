const userService = require('../service/user.service')
const ApiError = require("../error/error");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.findByParams()
      console.log(users);
      res.json(users)
    } catch (err) {
      next(err)
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.findOneByParams()
      res.json(user)
    } catch (err) {
      next(err)
    }
  },

  createUser: async (req, res, next) => {
    try {
      const user = await userService.create(req.body)

      res.json('User created')
    } catch (err) {
      next(err)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.update(userId, req.body)
      res.json('User updated')
    } catch (err) {
      next(err)
    }
  }

}