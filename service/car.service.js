const Car = require('../dataBase/Car')

module.exports = {
  findByParams: async (filter = {}) => {
    return Car.find(filter)
  },
  findOneById: async (carId) => {
    return Car.findById(carId).populate('user')
  },
  create: async (carInfo) => {
    return Car.create(carInfo)
  },
  // delete: async (userId) => {
  //   return Car.deleteOne({_id: userId})
  // },
  // update: async (carId, newCarInfo) => {
  //   return Car.findByIdAndUpdate(carId, newCarInfo, {new: true})
  // }
}