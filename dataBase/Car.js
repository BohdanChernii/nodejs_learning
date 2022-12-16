const {Schema, model} = require('mongoose')
const {string} = require("joi");

const carSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    year: {type: Number, min: 1980, max: 2022, require: true},
    price: {type: Number, min: 1000, default: 0, require: true},
    model: {type: String, min: 2, max: 30, default: '', trim: true, require: true}
  }, {
    timestamps: true
  }
)

module.exports = model('Car', carSchema)