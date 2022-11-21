const userDb = require('../users/users')
const  CustomError = require('../error/customError')
module.exports = {
  checkIfUserExist: (req, res, next) => {
    try {
      const {userId} = req.params
      const user = userDb[userId]
      if (!user) {
        throw new CustomError('This user is undefined!!!!',404)
      }
      req.user = user
      next()
    } catch (err) {
      next(err)
    }


  }
}