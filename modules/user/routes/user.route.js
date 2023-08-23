const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const otpController = require('../controllers/otp.controller');

// register all user routes here:
 router.post('/createUser', userController.createUser);
 router.post('/verifyUserWithOtp', userController.verifyUserWithOtp);
 router.post('/resendOtp', otpController.resendOtp);

// routes to be hidden in prod
if(process.env.NODE_ENV === 'development'){
 router.get('/getUserByPhoneNumber', userController.getUserByPhoneNumber);
}

module.exports = router;
