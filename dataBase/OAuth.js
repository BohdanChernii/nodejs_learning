const {Schema, model} = require('mongoose')

const OAuthSchema = new Schema({
  accessToken: {type: String, trim: true, require: true},
  refreshToken: {type: String, trim: true, require: true},
})

module.exports = model('OAuth', OAuthSchema)