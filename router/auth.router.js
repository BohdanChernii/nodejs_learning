const router = require('express').Router()
const authController = require('../controller/auth.controller')
const authMdlwr = require('../midleware/auth.midleware')
const userMdlwr = require('../midleware/user.midleware')
router.post(
  '/login',
  // authMdlwr.isBodyValid,
  userMdlwr.getUserDynamically('email'),
  authController.login)

router.post('/refresh'
  , authMdlwr.checkRefreshToken,
  authController.refresh)

router.post('/logout',
  authMdlwr.checkAccessToken,
  authController.logout)

router.post('/logoutAll',
  authMdlwr.checkAccessToken,
  authController.logout)

router.post('/password/forgot',
  userMdlwr.getUserDynamically('email'),
  authController.forgotPass)

router.put('/password/forgot',
  authMdlwr.checkActionType,
  authMdlwr.checkOldPasswords,
  authController.forgotPassAfterForgot)

module.exports = router