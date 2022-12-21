const Joi = require('joi')
const regexp = require('../enum/regex.enum')
module.exports = {
  idValidator: Joi.object({
      _id: Joi.string().regex(regexp.MONGO_ID),
    }
  )
}