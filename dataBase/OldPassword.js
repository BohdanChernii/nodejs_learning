const {Schema, model} = require('mongoose')

const oldPasswordSchema = new Schema({
  _user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  password: {type: String},
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('OldPassword', oldPasswordSchema)