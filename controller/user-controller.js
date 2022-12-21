const User = require ('../dataBase/User')
const userService = require('../services/user.service')

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      console.log('users');
      const users = await userService.findByParams()

      res.json(users)
    } catch (err) {
      next(err)
    }
  },
  getOneUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.findOneById(userId)
      res.status(201).json(user)
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

  deleteUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.deleteUser({_id: userId})

      res.json('User deleted')
    } catch (err) {
      next(err)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = userService.updateUser(userId, req.body)

      res.json('User deleted')
    } catch (err) {
      next(err)
    }
  },


  uploadAvatar:async (req,res,next)=>{
    try {


      res.json('Image ready')
      next()
    }catch (err){
      next(err)
    }
  }
}