const moment = require('moment');

const userWarehouse = require('../warehouse/user.warehouse');

const otpController = require('./otp.controller')
const otpWarehouse = require('../warehouse/otp.warehouse')

const userController = {

  createUser: async (requestBody) => {
    try { 

      const user = await userWarehouse.createUser(requestBody);
      await otpController.generateOtpForUser(user.id, user.dailCode, '7972228649');

      return user

    } catch (error) {
      throw error; // not throw new Error - new wont propogate status code to next(e)
    }
  },

  getUserByPhoneNumber: async (phone) => {
    try {

      const user = await userWarehouse.getUserByPhoneNumber(phone);
      if(!user) throw Object.assign(new Error('user not found'), { statusCode: 404 });
      
      return user

    } catch (error) {
      throw error;
    }
  },

  verifyUserWithOtp: async (requestBody, userId) => {
    try {

      let data = await otpWarehouse.getLatestOtpByUserId(userId);
      
      if(!data) throw Object.assign(new Error('no otp found! ...system error'), { statusCode: 404 });

      const currentMoment = moment.utc();
      const otpTimestamp = moment.utc(data.createdAt);

      const differenceInMinutes = currentMoment.diff(otpTimestamp, 'minutes');
     
      if(differenceInMinutes > 10) throw Object.assign(new Error('your otp is expired'), { statusCode: 403 });


      if(data.otp === requestBody.otp){
        await userWarehouse.updateUserById({ verified: true }, userId)
        return { response: "user verified" }
      }
      
      throw Object.assign(new Error('wrong otp'), { statusCode: 403 });
      
    } catch(error) {
      throw error
    }
  },

}

module.exports = userController;