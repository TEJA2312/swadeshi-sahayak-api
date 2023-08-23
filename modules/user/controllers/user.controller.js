const moment = require('moment');

const userWarehouse = require('../warehouse/user.warehouse');

const otpController = require('./otp.controller')
const otpWarehouse = require('../warehouse/otp.warehouse')

const userController = {

  createUser: async (req, res) => {
    try {
      
      const user = await userWarehouse.createUser(req.body);

      await otpController.generateOtpForUser(user.id, user.dailCode, '7972228649');

      return res.status(201).json(user);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'error creating user' });
    }
  },

  getUserByPhoneNumber: async (req, res) => {
    try {
      
      const user = await userWarehouse.getUserByPhoneNumber(req.query.phone);
      return res.status(200).json(user);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'error getting user by phone number' });
    }
  },

  verifyUserWithOtp: async (req, res) => {
    try {

      let data = await otpWarehouse.getLatestOtpByUserId(req.body.userId);

      if(!data) return res.status(404).json({ error: 'no otp found! ...system error' });

      const currentMoment = moment.utc();
      const otpTimestamp = moment.utc(data.createdAt);

      const differenceInMinutes = currentMoment.diff(otpTimestamp, 'minutes');

      if(differenceInMinutes > 10) return res.status(403).json({ error: 'your otp is expired' });   


      if(data.otp === req.body.otp){
        await userWarehouse.updateUserById({ verified: true }, req.body.userId)
        return res.status(200).json({ response: "user verified" });
      }
      
      return res.status(403).json({ error: "wrong otp" });
      
    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'error in verifying user' });
    }
  },

}

module.exports = userController;