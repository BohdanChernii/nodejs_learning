const {WELCOME, FORGOT_PASS} = require('../enum/email.action.enum')
module.exports = {
  [WELCOME]: {
    subject: 'User you are welcome',
    templateName: 'Welcome'
  },
  [FORGOT_PASS]: {
    subject: 'User did you forget your password?',
    templateName: 'Forgot password'
  }
}