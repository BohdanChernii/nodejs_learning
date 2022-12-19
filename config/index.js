require('dotenv')

module.exports = {

  PORT: 5000 || process.env.PORT,
  MONGO_URL: 'mongodb://localhost:27017/test-project' || process.env.MONGO_URL,
  DB_PASSWORD: process.env.DB_PASSWORD,

  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECET,

  FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

  TWILIO_ACCOUNT_SID:process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN:process.env.TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID:process.env.TWILIO_SERVICE_SID,
  TWILIO_NUMBER:process.env.TWILIO_NUMBER,

  CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'CAATS',
  FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.FORGOT_PASSWORD_ACTION_TOKEN_SECRET || 'FPATS'
}

