const {WELCOME, FORGOT_PASS} = require('../config/email-action.enum')
module.exports = {

  [WELCOME]: {
    subject: 'Welcome on board',
    templateName: 'welcome'
  },

  [FORGOT_PASS]: {
    subject: 'Forgot password on board',
    templateName: 'forgot-pass'
  }

}