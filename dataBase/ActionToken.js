const {Schema, model} = require('mongoose')
const authSchema = new Schema({
  _user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  tokenType: {type: String},
  token: {type: String}
},{
  timestamps:true
})

module.exports = model('ActionToken', authSchema)