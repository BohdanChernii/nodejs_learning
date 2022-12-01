const {carService} = require('../service')
const {json} = require("express");

module.exports = {
  getAllCars: async (req, res, next) => {
    try {
      const cars = await carService.getAllCars()

      res.status(200).json(cars)
      next()
    } catch (err) {
      next(err)
    }
  },

  getCarById: async (req, res, next) => {
    try {
      const {carId} = req.params
      const car = await carService.findOneByIdWithUser(carId)
      res.status(200).json(car)
      next()
    } catch (err) {
      next(err)
    }
  },
  create: async (req, res, next) => {
    try {
      const carInfo = req.body
      const car = await carService.create(carInfo)
      res.status(201).json(car)
      next()
    } catch (err) {
      next(err)
    }
  }
}