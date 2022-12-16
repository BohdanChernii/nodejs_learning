const {CronJob} = require('cron')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const OldPassword = require('../dataBase/OldPassword')

dayjs.extend(utc)

module.exports = new CronJob(
  '0 * * * * *',
  async function () {
    try {
      // console.log(dayjs().toISOString());
      console.log('Start removing passwords');
      const yearAgo = dayjs().utc().subtract(1, 'year')

      await OldPassword.deleteOne({createdAt: {$lte: yearAgo}})
      console.log('End old passwords')
    } catch (err) {
      console.log(err);
    }

  }
)