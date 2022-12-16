const {CronJob} = require('cron')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const Auth = require('../dataBase/Auth')

dayjs.extend(utc)

module.exports = new CronJob(
  '* * */1 * * *',
  async function () {
    try {
      console.log(dayjs().toISOString());
      const monthAgo = dayjs().utc().subtract(1, 'month')
      await Auth.deleteOne({createdAt: {$lte: monthAgo}})

    } catch (err) {
      console.log(err);
    }

  }
)