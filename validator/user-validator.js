const Joi = require('joi')
const regex = require('../enum/regex.enum')
module.exports = {
  isNewUserValid: Joi.object({
    name: Joi.string().trim().min(3).max(30).default('').required(),
    age: Joi.number().min(18).max(120).required(),
    password: Joi.string().regex(regex.PASSWORD).required(),
    email: Joi.string().regex(regex.EMAIL),
    phone: Joi.string().regex(regex.PHONE).required()
  }),
  editUserValid: Joi.object({
    name: Joi.string().trim().min(3).max(30).default('').optional(),
    age: Joi.number().min(18).max(120).optional(),
    email: Joi.string().regex(regex.EMAIL).optional(),

  })
}