const Joi = require('joi')

const regex = require('../enum/regex.enum')

module.exports ={
  authValidator:Joi.object({
    email:Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
    password:Joi.string().regex(regex.PASSWORD).required()
  })
}