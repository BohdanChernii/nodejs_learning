const userService = require('../service/user.service')
const User = require('../dataBase/User')
module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.findByParams()
      res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  },
  getOneUser: async (req, res, next) => {
    try {

      req.user.testMethods();

      console.log('_______________');
      User.testStatics()
      console.log(req.user);
      res.json(req.user)
      // const {userId} = req.params
      // const user = await userService.findOneById(userId)
      //
      // res.json(user)
    } catch (err) {
      next(err)
    }
  },
  createUser: async (req, res, next) => {
    try {
      // const user = await userService.create(req.body)
      User.createUserWithHashPassword(req.body)
      res.status(200).json('User created')
    } catch (err) {
      next(err)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.delete(userId)
      res.status(200).json('User Deleted')
    } catch (err) {
      next(err)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.updateUser(userId, req.body)

      res.status(201).json('User updated')

    } catch (err) {
      next(err)
    }
  }
}