const router = require('express').Router()
const carController = require('../controller/car.controller')

router.get('/', carController.getAllCars)

router.post('/', carController.create)

router.get('/:carId', carController.getCarById)

module.exports = router