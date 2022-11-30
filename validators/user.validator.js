const Joi  = require('joi')
const reqexp = require('../config/user.enum')
module.exports = {
  newUserValidator:Joi.object({
    name: Joi.string().min(2).max(100).required().default(''),
    email:Joi.string().regex(reqexp.EMAIL).lowercase().trim().required(),
    password:Joi.string().required().regex(reqexp.PASSWORD),
    age:Joi.number().integer().min(1).max(120)
  }),
  editUserValidator:Joi.object({
    name: Joi.string().min(2).max(100).default('').optional(),
    email:Joi.string().regex(reqexp.EMAIL).lowercase().trim().optional(),
    age:Joi.number().integer().min(1).max(120).optional()
  })
}