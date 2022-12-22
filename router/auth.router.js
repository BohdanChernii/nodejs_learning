const router = require("express").Router()
const authMdlwr = require('../midleware/auth.midleware')
const authController = require('../controller/auth.contrller')
const userMdlwr = require('../midleware/user.midleware')

router.post('/login',
  authMdlwr.isBodyValid,
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
