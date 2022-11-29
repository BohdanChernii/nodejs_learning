const {Schema, model} = require('mongoose')
const userSchema = new Schema({
    age: {type: Number, default: 18},
    name: {type: String, require: true, default: ''},
    password: {type: String},
    email: {type: String, trim: true, require: true, lowerCase: true,  unique: true},
  }, {
    timestamps: true
  }
)

module.exports = model('User', userSchema)