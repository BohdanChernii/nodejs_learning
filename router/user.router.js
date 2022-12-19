const express = require('express');
const router = express.Router();
const authMdlwr = require('../midleware/auth.midleware')
const userController = require('../controller/user.controller')
const userMdlwr = require('../midleware/user.midleware')

router.get('/', userController.getAllUsers)

router.post('/',
  userMdlwr.isNewUserValid,
  userMdlwr.checkEmailUnique,
  userController.createUser)

router.get('/:userId',
  userMdlwr.isUserIdValid,
  authMdlwr.checkAccessToken,
  userMdlwr.getUserDynamically('userId', 'params', '_id'),
  userController.getOneUser)

router.put('/:userId',
  userMdlwr.isUserIdValid,
  userMdlwr.isEditUserValid,
  userController.updateUser)

router.delete('/:userId',
  userMdlwr.isUserIdValid,
  userController.deleteUser)

module.exports = router