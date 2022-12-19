const User = require('../dataBase/User')

module.exports = {

  findByParams: async (filter = {}) => {
    return User.find(filter)
  },

  findOneById: async (userId) => {
    return User.findOne(userId)
  },

  findByIdWithCars: async (userId) => {
    return User.aggregate([
      {
        $match: {_id: userId}
      }, {
        $lookup: {
          from: 'cars',
          localField: '_id',
          foreignField: 'user',
          as: 'cars'
        }
      }
    ])
  },

  create: async (userInfo) => {
    return User.create(userInfo)
  },

  updateUser: async (userId, userInfo) => {
    return User.findByIdAndUpdate(userId, userInfo, {new: true})
  },

  delete: async (userId) => {
    return User.deleteOne({_id: userId})
  }
}