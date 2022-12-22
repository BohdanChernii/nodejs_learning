require('dotenv').config()
module.exports = {
  PORT: process.env.PORT || 5000,

  FRONTEND_URL: 'https://google.com',
  MONGO_URL:'mongodb://localhost:27017/test-project' || process.env.MONGO_URL,

  ACCESS_SECRET: process.env.ACCESS_SECRET || 'bohdan',
  REFRESH_SECRET: process.env.REFRESH_SECET || 'tcherniy',



  NO_REPLY_EMAIL: 'bodiachernii@gmail.com',
  NO_REPLY_PASSWORD: 'ubzienenrygfmvum',

  CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET: process.env.CONFIRM_ACCOUNT_ACTION_SECRET || 'CAATS',
  FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.FORGOT_PASSWORD_ACTION_TOKEN_SECRET || 'FPATS',


  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || 'AC395e7e1d3c6e9e5bfea521c6cd844351',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '4d8c3ec192dd39d916620037ea933a15',
  TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID || 'MG2c3b61edcb3a68947539e4278935fd82',
  TWILIO_NUMBER: process.env.TWILIO_NUMBER || '+15165184196',


  S3_BUCKET_NAME:process.env.S3_BUCKET_NAME,
  S3_BUCKET_REGION:process.env.S3_BUCKET_REGION,
  S3_ACCESS_KEY:process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY:process.env.S3_SECRET_KEY,

}