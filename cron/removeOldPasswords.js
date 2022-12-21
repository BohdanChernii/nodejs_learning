const OldPassword = require('../dataBase/OldPassword')
const {CronJob} = require('cron')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

module.exports = new CronJob(
  '0,20,40 * * * * *',
  async function () {
    try {
      // const users = await fetch('https://jsonplaceholder.typicode.com/users').then(user => user.json())

      // console.log(users);

      const yearAgo = dayjs().utc().subtract(1, 'year')

      await OldPassword.deleteMany({createdAt: {$lte: yearAgo}})
    } catch (err) {
      console.log(err);
    }
  }
)

