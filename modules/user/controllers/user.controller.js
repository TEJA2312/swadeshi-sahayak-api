const moment = require('moment');

const userWarehouse = require('../warehouse/user.warehouse');
const generateToken = require('../../../utils/generateToken.util')
const otpController = require('./otp.controller')
const otpWarehouse = require('../warehouse/otp.warehouse');


const userController = {

  createUser: async (requestBody) => {
    try { 

      const user = await userWarehouse.createUser(requestBody);
      const result = await userWarehouse.updateUserById({ jwtToken: generateToken(user.id) }, user.id);

      await otpController.generateOtpForUser(user.id, user.email);
      
      return result;

    } catch (error) {
      throw error; // not throw new Error - new wont propogate status code to next(e)
    }
  },

  getUserByEmail: async (email) => {
    try {

      const user = await userWarehouse.getUserByEmail(email);
      if(!user) throw Object.assign(new Error('user not found'), { statusCode: 404 });
      
      return user

    } catch (error) {
      throw error;
    }
  },

  verifyUserWithOtp: async (requestBody) => {
    try {

      let data = await otpWarehouse.getLatestOtpByUserId(requestBody.userId);
      if(!data) throw Object.assign(new Error('no otp found! ...system error'), { statusCode: 404 });

      const currentMoment = moment.utc();
      const otpTimestamp = moment.utc(data.createdAt);

      const differenceInMinutes = currentMoment.diff(otpTimestamp, 'minutes');
     
      if(differenceInMinutes > 10) throw Object.assign(new Error('your otp is expired'), { statusCode: 403 });


      if(data.otp === requestBody.otp){
        await userWarehouse.updateUserById({ emailVerified: true }, requestBody.userId);
        return { response: "user verified" }
      }
      
      throw Object.assign(new Error('wrong otp'), { statusCode: 403 });
      
    } catch(error) {
      throw error
    }
  },

}

module.exports = userController;