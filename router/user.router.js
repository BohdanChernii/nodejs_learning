const router = require('express').Router()

// const usersDb = require("../users/users");

const controller = require('../controller/user.controller')

const mdlwr = require('../midleware/user.midleware')


router.get('/', controller.getAllUsers)

router.post(
  '/',
  mdlwr.isBodyValid,
  controller.create
)

router.get(
  '/:userId',
  mdlwr.isIdValid,
  mdlwr.checkIfUserExist,
  controller.getUserById
)

router.put(
  '/:userId',
  mdlwr.isIdValid,
  mblwr.isBodyValidUpdate,
  mdlwr.checkIfUserExist,
  controller.updateUser
)

router.delete(
  '/:userId',
  mdlwr.isIdValid,
  mdlwr.checkIfUserExist,
  controller.deleteUser
)

module.exports = router