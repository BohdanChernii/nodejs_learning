const {Schema, model, Types} = require('mongoose')
const carSchema = new Schema({
  price: {type: Number, min: 1000, require: true},
  age: {type: Number, min: 1980, max: 2022, require: true},
  model: {type: String, trim: true, default: '', require: true},
  user: {type: Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
})
module.exports = model('Car', carSchema)