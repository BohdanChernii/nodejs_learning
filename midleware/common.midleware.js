module.exports = {
  isIdValid: (req, res, next) => {
    const {userInfo} = req.body
    if (userInfo.name.length < 3 || typeof userInfo.name !== 'string') {
      return res.status(404).json('Wrong name')
    }
    if (userInfo.age < 0 || typeof +userInfo.age !== 'number') {
      return res.status(404).json('Wrong age')
    }
  }
}