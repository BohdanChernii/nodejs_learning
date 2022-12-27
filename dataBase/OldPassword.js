const {Schema, model} = require("mongoose")

const oldPasswordSchema = new Schema({
  _user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  password: {type: String}
}, {
  timestamps: true,
  versionKey: false
})
module.exports = model('OldPassword', oldPasswordSchema)