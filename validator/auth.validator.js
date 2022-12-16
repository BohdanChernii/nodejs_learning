const Joi = require('joi')
const {PASSWORD,EMAIL} = require('../config/regexp')

module.exports = {
  loginValidator: Joi.object({
    password: Joi.string().regex(PASSWORD).trim().default('').required(),
    email:Joi.string().regex(EMAIL).trim().default('').required()
  })
}