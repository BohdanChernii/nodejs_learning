const userController = require('../controller/user.controller')
const User = require('../dataBase/User')
const ApiError = require("../error/error");
const {newUserValidator, editUserValidator} = require('../validator/user.validator')
const commonValidator = require('../validator/common.validator')
module.exports = {

  getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
    try {
      const fieldToSearch = req[from][fieldName]
      const user = await User.findOne({[dbField]: fieldToSearch})

      if (!user) {
        throw new ApiError('User not found', 404)
      }
      req.user = user
      next()
    } catch (err) {
      next(err)
    }
  },

  checkEmailUnique: async (req, res, next) => {
    try {
      const {email} = req.body

      if (!email) {
        throw new ApiError('Email not present', 400)
      }

      const user = await User.findOne({email})

      if (user) {
        throw new ApiError('User with this email already exist', 409)
      }
      next()
    } catch (err) {
      next(err)
    }
  },

  isNewUserValid: async (req, res, next) => {
    try {
      const validate = newUserValidator.validate(req.body)
      if (validate.error) {
        throw new ApiError(validate.error.message)
      }
      req.body = validate.value
      next()
    } catch (err) {
      next(err)
    }
  },

  isEditUserValid: async (req, res, next) => {
    try {
      const validate = editUserValidator.validate(req.body)
      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }

      req.body = validate.value

    } catch (err) {
      next(err)
    }
  },

  isUserIdValid: async (req, res, next) => {
    try {
      const {userId} = req.params
      const validate = commonValidator.isValidator.validate(userId)

      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }

      next()
    } catch (err) {
      next(err)
    }
  }

}