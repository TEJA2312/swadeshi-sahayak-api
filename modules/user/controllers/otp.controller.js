const moment = require('moment')

const otpWarehouse = require('../warehouse/otp.warehouse');
const userWarehouse = require('../warehouse/user.warehouse')
const generateOTP = require('../../../utils/otp.utils');
const sendSMS = require('../../../utils/otp.utils');

const otpController = {

  generateOtpForUser: async (userId, dailCode, phone) => {
    try{

      let data = {
        userId: userId,
        otp: generateOTP(6),
        createdAt: moment.utc().toDate()
      }

      await otpWarehouse.createOtp(data);
      
      // -- balance expired i'll activate soon --
      // await sendSMS(dailCode, phone, data.otp);

      return true;

    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  resendOtp: async (req, res) => {
   try {
      let user = await userWarehouse.getUserById(req.body.userId);

      if(!user) return res.status(404).json({ error: 'user not found' });

      let data = {
        userId: user.id,
        otp: generateOTP(6),
        createdAt: moment.utc().toDate()
      }

      await otpWarehouse.createOtp(data);

      // -- balance expired i'll activate soon --
      // await sendSMS(user.dailCode, "7972228649", data.otp);

      return res.status(201).json({ response: "otp sent to register mobile number" });

   } catch (error) {
      res.status(500).json({ error: 'error resending otp' });
      console.error(error);
   }
  }

}

module.exports = otpController;