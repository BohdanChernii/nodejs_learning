const Joi = require('joi')
const {MONGO_ID} = require('../config/regex')
module.exports = {
  isValidator: Joi.string().regex(MONGO_ID)
}