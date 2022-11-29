const express = require('express')
const router = express.Router()
const mdwlr = require('../midleware/user.midelware')

const {userService} = require("../services");
const {usersController} = require("../controllers");
router.get(
  '/',
  usersController.getAllUsers)

router.post(
  '/',
  // mdwlr.isNewUserValid,
  // mdwlr.isBodyValidCreate,
  // mdwlr.userNormalizator,
  // mdwlr.checkIsEmailUnique,
  usersController.createUser)

router.get('/:userId',
  mdwlr.isUserIdValid,
  mdwlr.checkIsUserExist,
  usersController.getUserById)


router.put(
  '/:userId',
  mdwlr.isUserIdValid,
  mdwlr.isEditUserValid,
  // mdwlr.isBodyValidUpdate,
  mdwlr.userNormalizator,
  usersController.updateUser
)

router.delete('/:userId',  mdwlr.isUserIdValid, usersController.deleteUser)

module.exports = router