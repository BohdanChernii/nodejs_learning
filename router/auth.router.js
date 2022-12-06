const router = require('express').Router()
const authController = require('../controller/auth.controller')
const mdlwr = require('../midleware/auth.midleware');
const userMdlwr = require('../midleware/user.midleware')
const authMdlwr = require('../midleware/auth.midleware')


router.post(
  '/login',
  mdlwr.isBodyValid,
  userMdlwr.getUserDynamically('email'),
  authController.login)

router.post(
  '/refresh',
  authMdlwr.checkRefreshToken,
  authController.refresh)

router.post(
  '/logout',
  authMdlwr.checkAccessToken,
  authController.logout)


router.post(
  '/logoutAll',
  authMdlwr.checkAccessToken,
  authController.logoutAll)

module.exports = router