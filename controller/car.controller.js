const carService = require('../service/car.service')
module.exports = {

  getAllCars: async (req, res, next) => {
    try {
      const cars = await carService.findByParams()

      res.status(201).json(cars)

    } catch (err) {
      next(err)
    }
  },

  getCarById: async (req, res, next) => {
    try {
      const {carId} = req.params
      const car = await carService.findOneById(carId)
      res.status(200).json(car)
    } catch (err) {
      next(err)
    }
  },

  create: async (req, res, next) => {
    try {
      const car = await carService.create(req.body)
      
      res.status(201).json(car)
    } catch {

    }
  }

}