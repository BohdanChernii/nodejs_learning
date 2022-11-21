const apartmentsDb = require('../apartments/apartments')
const CustomApartmentsError = require('../error/customApartmetsError')
module.exports = {
  checkIfApartmentExist: (req, res, next) => {
    try {
      const {apartmentId} = req.params
      const apartment = apartmentsDb[apartmentId]
      if (!apartment) {
        throw new CustomApartmentsError('This apartment is undefined', 404)
      }
      req.apartment = apartment
      next()
    } catch (err) {
      next(err)
    }
  }
}