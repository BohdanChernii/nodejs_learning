const {Schema, model} = require('mongoose')
const regexp = require('../config/regexp')

const userSchema = new Schema({
  name: {type: String, default: '', require: true},
  age: {type: Number, min: 18, max: 120, default: 18, require: true},
  password: {type: String},
  email: {type: String, trim: true, default: '', lowercase: true, require: true, unique: true},
}, {
  timestamps: true
})

module.exports = model('User', userSchema)