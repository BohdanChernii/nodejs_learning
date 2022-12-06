const Joi = require('joi')
const regexp = require('../config/regexp.enum')
module.exports = {
  newUserValidator: Joi.object({
    name: Joi.string().required().min(2).max(100).default(''),
    email: Joi.string().regex(regexp.EMAIL).required().lowercase().trim().required(),
    age: Joi.number().min(1).max(120).required(),
    password: Joi.string(),
  }),
  editUserValidator: Joi.object({
    name: Joi.string().min(2).max(100).default('').optional(),
    email: Joi.string().regex(regexp.EMAIL).required().lowercase().trim().optional(),
    age: Joi.number().min(1).max(120).optional(),
  })
}