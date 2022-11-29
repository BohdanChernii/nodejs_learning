const ApiError = require("../error/ApiError")

const {userService} = require("../services")

const {userNormalizator} = require('../helpers')

const commonValidator = require('../validators/common.validator')
const userValidator = require('../validators/user.validator')

const User = require('../dataBase/User')

const {json} = require("express");

module.exports = {

  checkIsUserExist: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = userService.findOneByParams({_id: userId})

      if (!user) {
        throw new ApiError('User not found', 404)
      }

      req.user = user

      next()
    } catch (err) {
      next(err)
    }
  },

  isUserIdValid: async (req, res, next) => {
    try {
      const {userId} = req.params
      const validate = await commonValidator.idValidator.validate(userId)
      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }
      next()
    } catch (err) {
      next(err)
    }
  },

  isNewUserValid: async (req, res, next) => {
    try {
      console.log(req.body)
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

  isBodyValidCreate: async (req, res, next) => {
    try {
      const {name, age, email} = req.body

      if (!name || name.length < 3 || typeof name !== 'string') {
        throw new ApiError('User name invalid or not exist', 400)
      }

      if (!age || age < 0 || Number.isNaN(+age)) {
        throw new ApiError('Wrong age', 400)
      }

      if (!email || !email.includes('@')) {
        throw new ApiError('Invalid email', 400)
      }

      next()
    } catch (err) {
      next(err)
    }
  },

  isBodyValidUpdate: (req, res, next) => {
    try {
      const {name, age, email} = req.body

      if (name && (name.length < 3 || typeof name !== 'string')) {
        throw new ApiError('Invalid user name', 400)
      }

      if (age && (age < 0 || Number.isNaN(+age))) {
        throw new ApiError('Invalid user age', 400)
      }

      if (email && !email.includes('@')) {
        throw new ApiError('Invalid user email', 400)
      }
      next()
    } catch (err) {
      next(err)
    }
  },

  userNormalizator: async (req, res, next) => {
    try {
      let {name, email} = req.body

      if (name) {
        req.body.name = userNormalizator.name(name)
      }

      if (email) {
        req.body.email = email.toLowerCase()
      }

      next()
    } catch (err) {
      next(err)
    }
  },

  checkIsEmailUnique: async (req, res, next) => {
    try {

      const {email} = req.body

      if (!req.body.email) {
        throw new ApiError('User email not found', 400)
      }

      const user = await userService.findOneByParams({email})

      if (user) {
        throw new ApiError('User with this email already exist', 409)
      }

      next()
    } catch (err) {
      next(err)
    }
  }

}