const axios = require('axios');

async function sendSMS(dailCode, phone, otp) {
 
 try {
    const url = "https://api.sms.to/sms/send";

    const data = {
      message: `${otp} is your OTP for verification on swadeshisahayakai.com`,
      to: `${dailCode}${phone}`,
      bypass_optou: true,
      sender_id: "SAHAYAK AI"
    }

    const headers = {
      'Authorization': `Bearer ${process.env.SMSTO_API_KEY}`,
      'Content-Type': 'application/json'
    };
    
    await axios.post(url, data, { headers });

    return true

 } catch(error) {
    console.error(error);
    throw new Error(error);
 }

}

module.exports = sendSMS;