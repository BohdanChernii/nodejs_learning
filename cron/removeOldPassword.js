const {CronJob} = require('cron')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const OldPassword = require('../dataBase/OldPassword')
const fetch = require("node-fetch");
dayjs.extend(utc)

const removeOldPassword = new CronJob(
  '0,20,40 * * * * *', async function () {
    try {
      const users = await fetch('https://jsonplaceholder.typicode.com/users').then(user => user.json())
      console.log(users);

      const yearAgo = dayjs().utc().subtract(1, 'year')
      await OldPassword.deleteOne({createdAt: {$lte: yearAgo}})

    } catch (err) {
      console.log(err);
    }
  }
)
module.exports = removeOldPassword