const {WELCOME, FORGOT_PASSWORD} = require('../config/email.action.enum')

module.exports = {

  [WELCOME]: {
    subject: 'User you are welcome',
    templateNme: 'Welcome'
  },

  [FORGOT_PASSWORD]: {
    subject: 'Dont worry you can restore your password',
    templateName: 'Forgot Password'
  }

}
