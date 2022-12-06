const {userService, authService} = require('../service')

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.findByParams()
      res.status(200).json(users)
      next()
    } catch (err) {
      next(err)
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.findByIdWithCars(req.user._id)
      res.status(200).json(user)
      next()
    } catch (err) {
      next(err)
    }
  },
  createUser: async (req, res, next) => {
    try {
      const hashPassword = await authService.hashPassword(req.body.password)
      const user = await userService.create({...req.body, password: hashPassword})
      res.status(200).json(user)
      next()
    } catch (err) {
      next(err)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const newUserInfo = req.body
      const user = await userService.update(userId, newUserInfo)
      res.json(user)
      next()
    } catch (err) {
      next(err)
    }
  },
  delete: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.delete(userId)
      res.status(200).json('User Deleted')
      next()
    } catch (err) {
      next(err)
    }
  }
}