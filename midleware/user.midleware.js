const User = require('../dataBase/User')
const ApiError = require("../error/error");
const {isNewUserValid, editUserValid} = require('../validator/user-validator')
const {idValidator} = require('../validator/common.validator')
module.exports = {
  getUserDynamically:
    (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
    try {
      const fieldToSearch = req[from][fieldName]

      console.log({[dbField]: fieldToSearch})
      const user = await User.findOne({[dbField]: fieldToSearch})

      console.log(user);
      if (!user) {
        throw new ApiError('User not found', 404)
      }

      req.user = user
      next()
    } catch (err) {
      next(err)
    }
  },
  checkIsEmailUnique: async (req, res, next) => {
    try {
      const {email} = req.body

      if (!email) {
        throw new ApiError('Email not present', 401)
      }
      console.log(email);
      const user = await User.findOne({email})

      if (user) {
        throw new ApiError('User with email this already exist', 409)
      }

      next()
    } catch (err) {
      next(err)
    }
  },

  isNewUserValid: async (req, res, next) => {
    try {
      const validate = isNewUserValid.validate(req.body)

      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }

      req.body = validate.value
      next()
    } catch (err) {
      next(err)
    }
  },

  editUserValid: async (req, res, next) => {
    try {
      const validate = editUserValid.validate(req.body)

      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }

      req.body = validate.value
      next()
    } catch (err) {
      next(err)
    }
  },
  isUserIdValid: async (req, res, next) => {
    try {
      const {userId} = req.params
      const validate = idValidator.validate(userId)
      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }
      req.body = validate.value
      next()
    } catch (err) {
      next(err)
    }
  }
}