const Joi = require('joi')
const regexp = require('../config/regexp')

module.exports = {
  newUserValidator: new Joi.object({
    age: Joi.number().min(18).required(),
    email: Joi.string().regex(regexp.EMAIL).trim().default('').required(),
    name: Joi.string().min(2).max(100).trim().default('').required(),
    password: Joi.string().regex(regexp.PASSWORD).trim().default('').required()
  }),

  editUserValidator: new Joi.object({
    age: Joi.number().min(18).optional(),
    email: Joi.string().regex(regexp.EMAIL).trim().default('').optional(),
    name: Joi.string().min(2).max(100).trim().default('').optional()
  })
}