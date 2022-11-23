const usersDb = require("../users/users.json");
const {fileServices} = require("../services")
module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await fileServices.reader()
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
  updateUser: async (req, res, next) => {
    try {

      const userInfo = req.body
      const {user, users} = req

      const index = users.findIndex(item => item.id === user.id)
      users[index] = {...users[index], ...userInfo}

      await fileServices.writer(users)

      res.status(200).json(users[index])
      next()
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
  }, create: async (req, res, next) => {
    try {
      const userInfo = req.body
      const users = await fileServices.reader()
      const newUser = {
        name: userInfo.name,
        age: userInfo.age,
        id: users[users.length - 1].id + 1
      }
      usersDb.push(userInfo)
      await fileServices.writer(users)
      res.status(201).json(newUser)
    } catch (err) {
      next(err)
    }
  }
}