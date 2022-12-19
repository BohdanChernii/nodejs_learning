const {Schema, model} = require('mongoose')
const authService = require("../service/auth.service");

const userSchema = new Schema({
  name: {type: String, trim: true, default: '', require: true},
  age: {type: Number, default: 18, min: 18, max: 120, require: true},
  email: {type: String, trim: true, default: '', require: true},
  password: {type: String, require: true},
}, {
  timestamps: true,
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
})


userSchema.virtual('fullName').get(function () {
  return `${this.name} BlaBlaBla`
})

userSchema.statics = {//for schema // this = model
  testStatics() {
    console.log('I am static');
  },

  async createUserWithHashPassword(user = {}) {
    const hashedPassword = await authService.hashPassword(user.password)
    return this.create({...user, password: hashedPassword})
  },


}

userSchema.methods = {//for single record
  testMethods() {
    console.log('I am method');
  },
  async comparePassword(password) {
    await authService.comparePassword(this.password, password)
  }
}

module.exports = model('User', userSchema)