const User = require('../dataBase/User')

module.exports = {

  findByParams: async (filter = {}) => {
    return User.find(filter)
  },

  findOneByParams: async (userId) => {
    return User.findOne(userId)
  },

  updateUser: async (userId, userInfo) => {
    return User.findByIdAndUpdate(userId, userInfo)
  },

  findUserWithCars: async (userId) => {
    const res = User.aggregate([
      {
        $match: {
          _id: userId
        },
        $lookup: {
          from: 'cars',
          localField: '_id',
          foreignField: 'user',
          as: 'cars'
        }
      }
    ])
    return res[0]
  },

  createUser: async (userInfo) => {
    return User.createWithHashPassword(userInfo)
  },

  deleteUser: async (userId) => {
    return User.deleteOne({_id: userId})
  }
}