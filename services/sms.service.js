const twilio = require('twilio')

const {TWILIO_ACCOUNT_SID, TWILIO_SERVICE_SID, TWILIO_AUTH_TOKEN} = require('../config')

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const sendSms =async (message,phone)=>{
  try {
    console.log(`SMS start sending ~ number ${phone}`);
    const sendResp= await client.message.create({
      body:message,
      to:phone,
      messagingServiceSid:TWILIO_SERVICE_SID
    })
  }catch (err){
    console.log(`SMS res ~ status ${err.message}`)
  }
}
module.exports={
  sendSms
}
