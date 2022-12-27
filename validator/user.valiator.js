const Joi = require("joi")
const regex = require('../config/regex')
module.exports = {
  isNewUserValid: new Joi.object({
    name: Joi.string().trim().min(3).max(30).required(),
    age: Joi.number().min(18).max(120).required(),
    email: Joi.string().regex(regex.EMAIL).required(),
    password: Joi.string().regex(regex.PASSWORD).required(),
    phone: Joi.string().regex(regex.PHONE).required()
  }),

  editUserValid: new Joi.object({
    name: Joi.string().trim().min(3).max(30).optional(),
    age: Joi.number().min(18).max(120).optional(),
    email: Joi.string().regex(regex.EMAIL).optional(),
  })

}

