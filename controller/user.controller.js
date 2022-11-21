const usersDb = require("../users/users");
module.exports = {
  getAllUsers: (req, res, next) => {
    try {
      console.log('users!!!!');
      res.json(usersDb)
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
  updateUser: (req, res, next) => {
    try {
      const {userId} = req.params
      const userInfo = req.body
      usersDb[userId] = userInfo
    } catch (err) {
      // res.status(400).json({
      //   message: err.message,
      //   code: 4001
      // })
      next(err)
    }
  },
  deleteUser: (req, res, next) => {
    try {
      const {userId} = req.params
      const index = usersDb.findIndex(item => item.id === +userId)
    } catch (err) {
      // res.status(4000).json({
      //   message: err.message,
      //   code: 4001
      // })
      next(err)
    }
  }
}