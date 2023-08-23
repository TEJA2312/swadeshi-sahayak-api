const Otp = require('../schemas/otp.schema');

const otpWarehouse = {

  createOtp: async (requestBody) => {
    return await Otp.create(requestBody);
  },

  getLatestOtpByUserId: async (userId) => {
    return await Otp.findOne({ userId: userId }).sort({ createdAt: -1 });
  }
  
}

module.exports = otpWarehouse;