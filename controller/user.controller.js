const userService = require('../service/user.service')
const User = require('../dataBase/User')
const {uploadPublicFile} = require('../service/s3.service')
const userRepository = require('../repository/user.repository')
const userPresenter = require('../presenter/user.presenter')
module.exports = {

  getAllUsers: async (req, res, next) => {
    try {
      // const users = await userService.findByParams()

      const data = await userRepository.find(req.query)

      const users = userPresenter.normalizeMany(data.users)
      res.status(200).json(users)

    } catch (err) {
      next(err)
    }
  },

  getOneUser: async (req, res, next) => {
    try {
      res.status(200).json(req.user)
    } catch (err) {
      next(err)
    }
  },

  createUser: async (req, res, next) => {
    try {
      const user = userService.createUser(req.body)
      res.json('User created')
    } catch (err) {
      next(err)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const {body} = req
      const {userId} = req.params

      await userService.updateUser(req.params.userId, body)
      // await User.findByIdAndUpdate({userId, body})
      res.json('user updated')
    } catch (err) {
      next(err)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const {userId} = req.params
      const user = await userService.deleteUser(userId)

      res.json('User deleted')
    } catch (err) {
      next(err)
    }
  },

  fileUploader: async (req, res, next) => {
    try {
      // console.log(req.files);

      const uploadedData = await uploadPublicFile(req.files.avatar, 'user', req.user._id)

      const updatedUser = await User.findByIdAndUpdate(req.user._id, {avatar: uploadedData.Location}, {new: true})

      // console.log(updatedUser);
      res.json(updatedUser)
    } catch (err) {
      console.log(err.message);
    }
  }

}