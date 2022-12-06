const User = require('../dataBase/User')

module.exports = {
  findByParams: async (filter = {}) => {
    return User.find(filter)
  },
  findOneByParams: async (filter = {}) => {
    return User.findOne(filter)
  },
  findByIdWithCars: async (userId) => {
    return User.aggregate([
      {
        $match: {_id: userId}
      },
      {
      $lookup:{
        from:'cars',
        localField:'_id',
        foreignField:'user',
        as:'cars'
      }
      }
    ])
  },
  create: async (userInfo) => {
    return User.create(userInfo)
  },
  delete: async (userId) => {
    return User.deleteOne({_id: userId})
  },
  update: async (userId, newUserInfo) => {
    return User.findByIdAndUpdate(userId, newUserInfo, {new: true})
  }
}