const Joi = require('joi')
const regexp = require('../config/regex')

module.exports = {
  newUserValidator: new Joi.object({
    age: Joi.number().min(18).max(120).required(),
    name: Joi.string().min(3).trim().default('').required(),
    email: Joi.string().regex(regexp.EMAIL).default('').required(),
    password: Joi.string().regex(regexp.PASSWORD),
    phone:Joi.string().regex(regexp.PHONE).required()
  }),
  editUserValidator: new Joi.object({
    age: Joi.number().min(18).max(120).optional(),
    name: Joi.string().min(3).trim().default('').optional(),
    email: Joi.string().regex(regexp.EMAIL).default('').optional(),
  })
}