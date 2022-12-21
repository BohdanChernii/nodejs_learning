const {Schema, model} = require('mongoose')
const authService = require('../services/auth.service')

const userSchema = new Schema({
  name: {type: String, min: 3, default: '', required: true},
  age: {type: Number, min: 18, max: 120, required: true},
  password: {type: String},
  avatar:{type:String},
  email: {type: String, default: '', required: true},
  phone: {type: String,required:true}
}, {
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

userSchema.virtual('fullName').get(function () {
  return `${this.name} BlaBlaBla`
})

userSchema.statics = {

  async createWithHashPassword(userObject = {}) {
    const hashPassword = authService.hashPassword(userObject.password)

    return this.create({...userObject, password: hashPassword})
  }

}

userSchema.methods = {

  async compareWithPassword(password) {
    await authService.comparePasswords(this.password, password)
  }

}

module.exports = model('User', userSchema)