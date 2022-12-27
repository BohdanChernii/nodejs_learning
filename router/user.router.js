const router = require('express').Router()
const userController = require('../controller/user.controller')
const userMdlwr = require('../midleware/user.midleware')
const authMdlwr = require('../midleware/auth.midleware')
const s3Service = require('../service/s3.service')
const {checkUploadImage} = require('../midleware/file.midleware')
router.get('/', userController.getAllUsers)

router.post('/',
  userMdlwr.checkIsNewUserValid,
  userMdlwr.checkIsEmailUnique,
  userController.createUser)

router.get('/:userId',
  userMdlwr.checkIdUserValid,
  userMdlwr.getUserDynamically('userId', 'params', '_id'),
  userController.getOneUser)

router.put('/:userId',
  userMdlwr.checkIdUserValid,
  userMdlwr.checkEditUserValid,
  // authMdlwr.checkAccessToken,
  userMdlwr.getUserDynamically('userId', 'params', '_id'),
  userController.updateUser)

router.delete('/:userId',
  userMdlwr.checkIdUserValid,
  authMdlwr.checkAccessToken,
  userController.deleteUser)

router.patch('/:userId/avatar',
  checkUploadImage,
  // authMdlwr.isBodValid,
  userMdlwr.getUserDynamically('userId', 'params', "_id"),

  userController.fileUploader
)

module.exports = router