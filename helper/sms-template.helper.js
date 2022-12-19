const {WELCOME, FORGOT_PASS} = require('../eum/sms.action.enum')

module.exports = {

  [WELCOME]: (name) => {
    return `WELCOME ${name}, welcome on your platform!`
  },

  [FORGOT_PASS]: ({name}) => {
    return `WELCOME ${name}, check email`
  },

}
