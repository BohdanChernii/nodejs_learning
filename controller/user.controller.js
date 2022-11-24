const User = require("../users/User");
module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({})
      console.log('users!!!!');
      res.json(users)
    } catch (err) {
      // res.status(400).json({
      //   message: err.message,
      //   code: 4001
      // })
      next(err)
    }

  },
  getUserById: (req, res, next) => {
    try {
      // const {userId} = req.params
      // const userInfo = req.body
      res.json(req.user)
    } catch (err) {
      // res.status(400).json({
      //   message: err.message,
      //   code: 4001
      // })
      next(err)
    }
  },
  create: async (req, res, next) => {
    try {
      await User.create(req.body)
      res.json('user created')
    } catch (err) {
      next(err)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const userInfo = req.body
      await User.findByIdAndUpdate(userId, userInfo)
    } catch (err) {
      // res.status(400).json({
      //   message: err.message,
      //   code: 4001
      // })
      next(err)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      await User.deleteOne({_id: userId})
      res.status(204).json('user deleted')
    } catch (err) {
      // res.status(4000).json({
      //   message: err.message,
      //   code: 4001
      // })
      next(err)
    }
  }
}