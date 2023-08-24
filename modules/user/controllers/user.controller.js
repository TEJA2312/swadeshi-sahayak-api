const moment = require('moment');

const userWarehouse = require('../warehouse/user.warehouse');

const otpController = require('./otp.controller')
const otpWarehouse = require('../warehouse/otp.warehouse')

const userController = {

  createUser: async (req, res, next) => {
    try {
      
      const user = await userWarehouse.createUser(req.body);

      await otpController.generateOtpForUser(user.id, user.dailCode, '7972228649');

      return res.status(201).json(user);

    } catch (error) {
      console.error(error)
      next(error);
    }
  },

  getUserByPhoneNumber: async (req, res, next) => {
    try {
      
      const user = await userWarehouse.getUserByPhoneNumber(req.query.phone);
      return res.status(200).json(user);

    } catch (error) {
      console.error(error)
      next(error)
    }
  },

  verifyUserWithOtp: async (req, res, next) => {
    try {

      let data = await otpWarehouse.getLatestOtpByUserId(req.body.userId);
      
      if(!data) throw Object.assign(new Error('no otp found! ...system error'), { statusCode: 404 });

      const currentMoment = moment.utc();
      const otpTimestamp = moment.utc(data.createdAt);

      const differenceInMinutes = currentMoment.diff(otpTimestamp, 'minutes');
     
      if(differenceInMinutes > 10) throw Object.assign(new Error('your otp is expired'), { statusCode: 403 });


      if(data.otp === req.body.otp){
        await userWarehouse.updateUserById({ verified: true }, req.body.userId)
        return res.status(200).json({ response: "user verified" });
      }
      
      throw Object.assign(new Error('wrong otp'), { statusCode: 403 });
      
    } catch(error) {
      console.error(error)
      next(error)
    }
  },

}

module.exports = userController;