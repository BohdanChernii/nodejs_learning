const {Schema, model} = require('mongoose')
const carSchema = new Schema({
  model: {type: String, require: true, trim: true, default: ''},
  price: {type: Number, require: true, min: 1000, max: 1000000},
  year: {type: Number, require: true, min: 1980, max: 2022}
})

module.exports = model('Car', carSchema)