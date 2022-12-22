const router = require('express').Router();

const userController = require('../controller/user-controller')
const userMdlwr = require('../midleware/user.midleware')
const authMdlwr = require('../midleware/auth.midleware')
const fileMdlwr = require('../midleware/file.midleware')

router.get('/', userController.getAllUsers)


router.post('/',
  userMdlwr.isNewUserValid,
  userMdlwr.checkIsEmailUnique,
  userController.createUser)

router.get('/:userId',
  userMdlwr.editUserValid,
  userController.getOneUser
)
router.put('/:userId',
  userMdlwr.isUserIdValid,
  authMdlwr.checkAccessToken,
  userMdlwr.getUserDynamically('userId','params','_id'),
  userController.updateUser
)
router.delete('/:userId',
  userMdlwr.isUserIdValid,
  authMdlwr.checkAccessToken,
  userController.deleteUser)

router.patch('/:userId/avatar',
  fileMdlwr.checkUploadImage,
  // userMdlwr.isUserIdValid,
  userMdlwr.getUserDynamically('userId','params','_id'),
  userController.uploadAvatar
  )

module.exports = router