const userDb = require('../users/users.json')
const CustomError = require('../error/customError')
const {fileServices} = require("../services");
module.exports = {
  checkIfUserExist: async (req, res, next) => {
    try {
      const {userId} = req.params

      const users = await fileServices.reader()

      const user = userDb.find(u => u.id === +userId)
      if (!user) {
        throw new CustomError('This user is undefined!!!!', 404)
      }
      req.users = users
      req.user = user
      next()
    } catch (err) {
      next(err)
    }
  },
  isBodyValid: (req, res, next) => {
    try {
      const {age, name} = req.body
      if (name && (name.length < 3 || typeof name !== 'string')) {
        return res.status(404).json('Wrong name')
      }
      if (age(age < 0 || typeof +age !== 'number')) {
        return res.status(404).json('Wrong age')
      }
      next()
    } catch (err) {
      next(err)
    }
  },
  isIdValid: (req, res, next) => {
    try {
      const {userId} = req.params

      if (userId < 0 || typeof +userId !== 'number') {
        return res.status(404).json('Wrong id')
      }
      next()
    } catch (err) {
      next(err)
    }
  },
  isBodyValidCreate: (req, res, next) => {
    try {
      const {age, name} = req.body
      if (!name || name.length < 3 || typeof name !== 'string') {
        return res.status(404).json('Wrong name')
      }
      if (!age || age < 0 || typeof +age !== 'number') {
        return res.status(404).json('Wrong age')
      }
      next()
    } catch (err) {
      next(err)
    }
  },

  isBodyValidUpdate: (req, res, next) => {
    try {
      const {age, name} = req.body
      if (name.length < 3 || typeof name !== 'string') {
        return res.status(404).json('Wrong name')
      }
      if (age < 0 || typeof +age !== 'number') {
        return res.status(404).json('Wrong age')
      }
      next()
    } catch (err) {
      next(err)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const {user, users} = req

      const index = users.findIndex(item => item.id === user.id)
      users.splice(index, 1)

      await fileServices.writer(users)

      res.sendStatus(204)

    } catch (err) {
      next(err)
    }
  }

}