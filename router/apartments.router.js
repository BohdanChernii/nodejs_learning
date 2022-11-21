const controller = require('../controller/apartment.controller')
const mdwr = require('../midleware/apartments.midlware')
const router = require('express').Router()

router.get('/',controller.getAllApartments)
router.get('/:apartmentId', mdwr.checkIfApartmentExist, controller.getByIdApartments)
router.put('/:apartmentId', mdwr.checkIfApartmentExist, controller.updateApartment)
router.delete('/:apartmentId', mdwr.checkIfApartmentExist, controller.deleteApartment)
module.exports = router