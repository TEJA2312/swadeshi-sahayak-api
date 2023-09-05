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
      throw error;
    }
  },

  resendOtp: async (userId) => {
   try {
      let user = await userWarehouse.getUserById(userId);
   
      if(!user) throw Object.assign(new Error('user not found'), { statusCode: 404 });
      
      let data = {
        userId: user.id,
        otp: generateOTP(6),
        createdAt: moment.utc().toDate()
      }

      await otpWarehouse.createOtp(data);

      // -- balance expired i'll activate soon --
      // await sendSMS(user.dailCode, "7972228649", data.otp);

      return { response: "otp sent to register mobile number" }

   } catch (error) {
      throw error
   }
  }

}

module.exports = otpController;