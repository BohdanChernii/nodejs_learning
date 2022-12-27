const {Schema, model} = require('mongoose')
const authService = require('../service/auth.service')

const userSchema = new Schema({
  name: {type: String, required: true, default: ''},
  email: {type: String,  trim: true, lowercase: true, unique: true},
  password: {type: String},
  phone: {type: String, required: true},
  age: {type: Number, default: 18},
  avatar:{type: String},
}, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
})


userSchema.virtual('fullName').get(function () {
  return `${this.name} Tcherniy`
})

userSchema.statics = {
  async createWithHashPassword(userObject = {}) {
    const hashPassword = await authService.hashPassword(userObject.password)

    return this.create({...userObject, password: hashPassword})
  }
}

userSchema.methods = {
  async comparePassword(password) {
    await authService.comparePasswords(this.password, password)
  }
}

module.exports = model('User', userSchema)