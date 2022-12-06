const {userService} = require('../service')

const ApiError = require('../error/ApiError')

const userValidator = require('../validator/user.validator')

const commonValidator = require('../validator/common.validator')

const User = require('../dataBase/User')

module.exports = {
  getUserDynamically: (fieldName, from = 'body', abField = fieldName) => async (req, res, next) => {
    try {

      const fieldToSearch = req[from][fieldName]

      const user = await User.findOne({[abField]: fieldToSearch})

      if (!user) {
        throw new ApiError('User not found', 404)
      }

      req.user = user

      next()

    } catch (err) {
      next(err)
    }
  },
  // checkIfUserExist: async (req, res, next) => {
  //   try {
  //     const {userId} = req.params
  //     const user = await userService.findOneByParams({_id: userId})
  //     if (!user) {
  //       throw new ApiError('User not found', 400)
  //     }
  //     next()
  //   } catch (err) {
  //     next(err)
  //   }
  // },

  checkIsEmailUnique: async (req, res, next) => {
    try {
      const {email} = req.body

      if (!email) {
        throw new ApiError('Email not present', 400)
      }

      const user = await User.findOne({email})

      if (user) {
        throw new ApiError('User with this already exist', 409)
      }
      next()
    } catch (err) {
      next(err)
    }
  },
  isNewUserValid: async (req, res, next) => {
    try {
      const validate = userValidator.newUserValidator.validate(req.body)

      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }
      req.body = validate.value

      next()

    } catch (err) {
      next(err)
    }
  },
  isEditUserValid: async (req, res, next) => {
    try {
      const validate = userValidator.editUserValidator.validate(req.body)

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