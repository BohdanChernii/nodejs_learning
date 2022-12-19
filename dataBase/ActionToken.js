const {Schema, model} = require('mongoose')

const actionTokenSchema = new Schema({
  _user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  token: {types: String},
  tokenType: {type: String}
}, {
  timestamps: true
})
module.exports = model('ActionToken', actionTokenSchema)