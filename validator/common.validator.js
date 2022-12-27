const Joi = require("joi")
const regex = require("../config/regex")
module.exports = {
  isIdValid: new Joi.string().regex(regex.MONGO_ID)
}