const router = require('express').Router()

const {userController} = require('../controller')

const userMdwlr = require('../midleware/user.midleware')

const authMdwlr = require('../midleware/auth.midleware')

router.get('/', userController.getAllUsers)

router.post(
  '/',
  userMdwlr.isNewUserValid,
  userMdwlr.checkIsEmailUnique,
  userController.createUser)

router.get(
  '/:userId',
  userMdwlr.isUserIdValid,
  userMdwlr.getUserDynamically('userId', 'params', '_id'),
  userController.getUserById)

router.put('/:userId',
  userMdwlr.isUserIdValid,
  userMdwlr.isEditUserValid,
  // userMdwlr.checkIsEmailUnique,
  authMdwlr.checkAccessToken,
  userMdwlr.getUserDynamically('userId', 'params', '_id'),
  userController.updateUser)

router.delete(
  '/:userId',
  userMdwlr.isUserIdValid,
  authMdwlr.checkAccessToken,
  userController.delete)

module.exports = router