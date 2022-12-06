const Joi = require('joi')
module.exports ={
  carValidator: Joi.object({
    year:Joi.number().min(1980).max(2022).required(),
    price:Joi.number().min(1000).required(),
    model:Joi.string().trim().default('').required()
  })
}