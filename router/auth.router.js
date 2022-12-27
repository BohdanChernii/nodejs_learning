const router = require('express').Router()

const authMdlwr = require('../midleware/auth.midleware')
const userMdlwr = require('../midleware/user.midleware')

const authController = require('../controller/auth.controller')

router.post('/login',
  authMdlwr.isBodValid,
  userMdlwr.getUserDynamically('email'),
  authController.login)

router.post('/refresh',
  authMdlwr.checkRefreshToken,
  authController.refresh)

router.post('/password/forgot',
  userMdlwr.getUserDynamically('email'),
  authController.forgotPassword)

router.put('/password/forgot',
  authMdlwr.checkActionToken,
  authMdlwr.checkOldPassword,
  authController.forgotPasswordAfterForgot)

module.exports = router