const Joi = require('joi');
const reqexp = require("../config/user.enum");
module.exports = {
  loginValidator: Joi.object({
    email:Joi.string().regex(reqexp.EMAIL).lowercase().trim().required(),
    password:Joi.string().required().regex(reqexp.PASSWORD).required(),
  })
}