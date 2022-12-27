const Joi = require('joi')
const regex = require('../config/regex')
module.exports = {
  isLoginValid: new Joi.object({
    email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
    password: Joi.string().regex(regex.PASSWORD).trim().required()
  })
}