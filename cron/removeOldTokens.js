const {CronJob} = require('cron')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const Auth = require('../dataBase/Auth')

dayjs.extend(utc)

module.exports = new CronJob(
  '* * 1 * * *',
  async function () {
    try {
      const monthAgo = dayjs().utc().subtract(1, "month")
      await Auth.deleteMany({createdAt: {$lte: monthAgo}})
    } catch (err) {
      console.log(err);
    }
  }
)


