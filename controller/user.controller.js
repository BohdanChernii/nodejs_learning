const userService = require('../service/user.service')
const authService = require('../service/auth.service')

module.exports = {

  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.findByParams()
      res.json(users)
      next()
    } catch (err) {
      next(err)
    }
  },

  getOneUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.findOneByParams(userId)
      res.status(200).json(user)
      next()
    } catch (err) {
      next(err)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.updateUser(userId, req.body)

      next()
    } catch (err) {
      next(err)
    }
  },


  createUser: async (req, res, next) => {
    try {
      const hashPassword = await authService.hashPassword(req.body.password)
      const user = await userService.create({...req.body, password: hashPassword})

      res.status(201).json('User created')

      next()
    } catch (err) {
      next(err)
    }
  },

  deleteUser: async (req, res, next) => {
    try {

      const {userId} = req.params
      const user = await userService.delete(userId)

      res.status(200).json(user)
      next()
    } catch (err) {
      next(err)
    }
  }

}