const {Schema, model} = require('mongoose')

const authSchema = new Schema({
  accessToken: {type: String, trim: true, require: true},
  refreshToken: {type: String, trim: true, require: true}
})

module.exports = model('Auth', authSchema)