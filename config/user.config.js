require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test-project',
  DB_PASSWORD: process.env.DB_PASSWORD || '32424234',

  ACCESS_SECRET: process.env.ACCESS_SECRET || 'bohdan',
  REFRESH_SECRET: process.env.REFRESH_SECRET || 'tcherniy',

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD
}
