const User = require("../dataBase/User");
const {userService} = require("../service")

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.findByParams()
      console.log('users!!!!');
      res.json(users)
    } catch (err) {
      next(err)
    }

  },
  getUserById: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = userService.findByIdWithCars({_id: user._id})
      res.json(user)
    } catch (err) {

      next(err)
    }
  },
  create: async (req, res, next) => {
    try {
      await userService.create(req.body)
      res.json('user created')
    } catch (err) {
      next(err)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const userInfo = req.body
      await userService.updateUser(userId, userInfo)
    } catch (err) {

      next(err)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      await userService.delete({_id: userId})
      res.status(204).json('user deleted')
    } catch (err) {

      next(err)
    }
  }
}