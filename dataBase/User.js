const {Schema, model} = require('mongoose')
const userSchema = new Schema({
  name: {type: String, require: true, default: ''},
  age: {type: String, require: true, min: 18, max: 120, default: 18},
  email: {type: String, require: true, trim: true, lowerCase: true},
  password: {type: String}
}, {
  timestamps: true
})

module.exports = model('User', userSchema)