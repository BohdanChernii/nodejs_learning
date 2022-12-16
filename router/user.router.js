const router = require('express').Router()
const userController = require('../controller/user.controller')
const userMdlwr = require('../midleware/user.midleware')
const authMdlwr = require('../midleware/auth.midleware')

router.get('/',
  userController.getAllUsers)

router.post('/',

  userMdlwr.isNewUserValid,

  // userMdlwr.checkEmailUnique,

  userController.createUser)


router.get('/:userId',
  userMdlwr.isUserIdValid,
  userMdlwr.getUserDynamically('userId','params','_id'),
  userController.getOneUser)

router.put('/:userId',
  userMdlwr.isUserIdValid,
  userMdlwr.isEditUserValid,
  authMdlwr.checkAccessToken,
  userMdlwr.getUserDynamically('userId','params','_id'),
  userController.updateUser)

router.delete('/:userId',
  userMdlwr.isUserIdValid,
  authMdlwr.checkAccessToken,
  userController.deleteUser)

module.exports = router

