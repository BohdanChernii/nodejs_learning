const User = require('../dataBase/User')
module.exports = {
  find: async (query) => {
    const {limit = 10, page = 1, name, age} = query

    let findObj = {}

    if (name) {
      findObj = {
        ...findObj,
        name: new RegExp(name)
      }
    }

    if (age) {
      findObj = {
        ...findObj,
        age: {$lte: +age}
      }
    }

    const [users, count] = await Promise.all([
      await User.find(findObj).limit(limit).skip((+page - 1) * limit),
      await User.count(findObj)
    ])

    return {
      users,
      page: +page,
      count
    }
  }
}