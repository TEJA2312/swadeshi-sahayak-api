const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const otpController = require('../controllers/otp.controller');
const verifyToken = require('../../../middlewares/verifyToken.middlewares')


 router.post('/createUser', async (req, res, next)=>{
  try{
   const result = await userController.createUser(req.body); 
   return res.status(201).json(result);
  }catch(error) {
    next(error);
  }
 });

 router.get('/getUserByEmail', verifyToken,  async (req, res, next)=> {
  try{
   const result = await userController.getUserByEmail(req.query.email); 
   return res.status(200).json(result);
  }catch(error) {
    next(error);
  }
 });

 router.post('/verifyUserWithOtp', async (req, res, next)=>{
  try{
   const result = await userController.verifyUserWithOtp(req.body); 
   return res.status(200).json(result);
  }catch(error) {
    next(error);
  }
 });


 router.post('/resendOTP', async (req, res, next)=>{
  try{
   const result = await otpController.generateOtpForUser(req.body.userId, req.body.email); 
   return res.status(200).json(result);
  }catch(error) {
    next(error);
  }
 });


module.exports = router;
