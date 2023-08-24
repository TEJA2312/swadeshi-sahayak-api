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
      throw Object.assign(new Error(error.message), { statusCode: 500 });
    }
  },

  resendOtp: async (req, res, next) => {
   try {
      let user = await userWarehouse.getUserById(req.body.userId);

      if(!user) throw Object.assign(new Error('user not found'), { statusCode: 404 });

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
      console.error(error);
      next(error);
   }
  }

}

module.exports = otpController;