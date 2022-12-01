const User = require('../dataBase/User')

module.exports = {
  findByParams: async (filter = {}) => {
    return User.find(filter)
  },

  findOneByParams: async (filter = {}) => {
    return User.findOne(filter)
  },

  findByIdWithCars: async (userId) => {
    const res = await User.aggregate([
      {
        $match: {
          _id: userId
        }
      }, {
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

  create: async (filter = {}) => {
    return User.create(filter)
  },

  updateUser: async (_id, userInfo) => {
    return User.updateOne(_id, userInfo, {new: true})
  },

  delete: async (userId) => {
    return User.deleteOne({_id: userId})
  }
}