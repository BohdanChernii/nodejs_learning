const Joi = require('joi')
const regexp = require('../config/regexp')
module.exports ={
  isValidator:Joi.string().regex(regexp.MONGO_ID)
}