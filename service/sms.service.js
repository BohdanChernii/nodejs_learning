const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, TWILIO_NUMBER} = require("../config");
const accountSid = 'AC395e7e1d3c6e9e5bfea521c6cd844351';
const authToken = '[AuthToken]';
const twilio = require('twilio')

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const sendSms = async (message, phone) => {
  try {
    console.log(`SMS start sending ~ number: ${phone}`);

    const res = await client.message.create({
      body: message,
      to: phone,
      messagingServiceSid: TWILIO_SERVICE_SID
    })

    console.log(`SMS res ~ status${res.status}}`);
  } catch (err) {
    console.log(`SMS service - ${err.message}`)
  }
}



module.exports = {
  sendSms
}