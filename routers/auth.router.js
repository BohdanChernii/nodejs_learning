const router = require('express').Router()

const {authController} = require('../controllers')
const mdlwr = require('../midleware/auth.midleware')
const userMdlwr = require('../midleware/user.midelware')

router.post('/login', mdlwr.isBodyValid,userMdlwr.getUserDynamically('email'), authController.login)

module.exports = router