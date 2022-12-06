const {carService} = require('../service')

module.exports = {
  getAllCars: async (req, res, next) => {
    try {
      const cars = await carService.findByParams()
      res.status(200).json(cars)
      next()
    } catch (err) {
      next(err)
    }
  },
  getCarById: async (req, res, next) => {
    try {
      const {carId} = req.params
      const car = await carService.findOneById(carId)
      res.status(200).json(car)
      next()
    } catch (err) {
      next(err)
    }
  },
  createCar: async (req, res, next) => {
    try {
      // const hashPassword = await authService.hashPassword(req.body.password)
      // const user = await userService.create({...req.body, password: hashPassword})


      const car = carService.create(req.body)

      res.status(201).json(car)
      next()
    } catch (err) {
      next(err)
    }
  },
  // updateUser: async (req, res, next) => {
  //   try {
  //     const {userId} = req.params
  //     const newUserInfo = req.body
  //     const user = await userService.update(userId, newUserInfo)
  //     res.json(user)
  //     next()
  //   } catch (err) {
  //     next(err)
  //   }
  // },
  // delete: async (req, res, next) => {
  //   try {
  //     const {userId} = req.params
  //     const user = await userService.delete(userId)
  //     res.status(200).json('User Deleted')
  //     next()
  //   } catch (err) {
  //     next(err)
  //   }
  // }
}