const Joi = require('joi')
const regexp = require('../config/regexp.enum')
module.exports = {
  loginValidator: Joi.object({
    password: Joi.string().regex(regexp.PASSWORD).trim().required(),
    email: Joi.string().regex(regexp.EMAIL).required().lowercase().trim().required(),
  }),
}