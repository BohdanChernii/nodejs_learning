const User = require('../dataBase/User')

module.exports = {
  findByParams: async (filter = {}) => {
    return User.find(filter)
  },

  findOneById: async (userId) => {
    return User.findById(userId)
  },

  findByIdWithCars: async (userId) => {
    return User.aggregate([{
      $match: {_id: userId}
    }, {
      $lookup: {
        from: 'cars',
        localField: '_id',
        foreignField: '_user_id',
        as: 'cars'
      }
    }])
  },

  create: async (userInfo) => {
    return User.create(userInfo)
  },

  updateUser: async (userId, userInfo) => {
    return User.findByIdAndUpdate(userId, userInfo, {new: true})
  },

  deleteUser: async (userId) => {
    return User.deleteOne({_id: userId})
  }

}