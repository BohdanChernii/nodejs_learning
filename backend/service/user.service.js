const User = require('../dataBase/User')
module.exports = {

  findByParams: async (filter = {}) => {
    return User.find(filter)
  },

  findOneByParams: async (userId) => {
    return User.findOne(userId)
  },

  create: async (userInfo) => {
    return User.create(userInfo)
  },

  update: async (userId, userInfo) => {
    return User.findOneAndUpdate(userId, userInfo, {new: true})
  },

  delete: async (userId) => {
    return User.deleteOne({_id: userId})
  }

}
