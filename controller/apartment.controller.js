const apartmentsDb = require('../apartments/apartments')
module.exports = {
  getAllApartments: (req, res, next) => {
    try {
      res.json(apartmentsDb)
    } catch (err) {
      next(err)
    }
  },
  getByIdApartments: (req, res, next) => {
    try {
      // const {apartmentId} = req.params
      // const apartment = apartmentsDb[apartmentId]
      next(req.apartment)
    } catch (err) {
      next(err)
    }
  },
  updateApartment: (req, res, next) => {
    try {
      const {apartmentId} = req.params
      const apartmentInfo = req.body
      apartmentsDb[apartmentId] = apartmentInfo
    } catch (err) {
      next(err)
    }
  },
  deleteApartment: (req, res, next) => {
    try {
      const {apartmentId} = req.params
      const index = apartmentsDb.findIndex((item, index) => +apartmentId === index)
      if (index !== -1) {
        apartmentsDb.splice(index, 1)
      }
    } catch (err) {
      next(err)
    }
  }
}