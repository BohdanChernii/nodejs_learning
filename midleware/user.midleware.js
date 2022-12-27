const validator = require('../validator/user.valiator')
const commonValidator = require('../validator/common.validator')
const User = require('../dataBase/User')
const ApiError = require("../errror/error");
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

  checkIsNewUserValid: async (req, res, next) => {
    try {
      let validate = validator.isNewUserValid.validate(req.body)
      if (validate.error) {
        throw new ApiError(validate.error.message, 500)
      }
      req.body = validate.value

    } catch (err) {
      next(err)
    }
  },

  checkEditUserValid: async (req, res, next) => {
    try {
      let validate = validator.editUserValid.validate(req.body)

      if (validate.error) {
        throw new ApiError(validate.error.message, 500)
      }
      console.log(req.body);
      req.body = validate.value

      next()
    } catch (err) {
      next(err)
    }
  },

  checkIdUserValid: async (req, res, next) => {
    try {
      const {userId} = req.params
      console.log(userId);
      let validate = commonValidator.isIdValid.validate(userId)

      if (validate.error) {
        throw new ApiError(validate.error.message, 500)
      }

      next()
    } catch (err) {
      next(err)
    }
  },
  checkIsEmailUnique: async (req, res, next) => {
    try {
      const {email} = req.body

      if (!email) {
        throw new ApiError('Email not present', 500)
      }

      const user = await User.findOne({email})

      if (user) {
        throw new ApiError('User with this email already exist', 500)
      }

      next()
    } catch (err) {
      next(err)
    }
  }

}