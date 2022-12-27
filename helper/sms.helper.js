const {FORGOT_PASS, WELCOME} = require('../enum/sms_enum')
module.exports = {
  [WELCOME]: (name) => {
    return `Hi ${name} welcome on board`
  },
  [FORGOT_PASS]: (name) => {
    return `Hi ${name} check your email`
  }
}