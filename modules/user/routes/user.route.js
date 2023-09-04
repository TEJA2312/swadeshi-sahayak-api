const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const otpController = require('../controllers/otp.controller');


 router.post('/createUser', async (req, res, next)=>{
  try{
   const result = await userController.createUser(req.body); 
   return res.status(201).json(result);
  }catch(error) {
    next(error);
  }
 });

 router.get('/getUserByPhoneNumber', async (req, res, next)=>{
  try{
   const result = await userController.getUserByPhoneNumber(req.query.phone); 
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

 router.post('/resendOtp', async (req, res, next)=>{
  try{
   const result = await otpController.resendOtp(req.body); 
   return res.status(200).json(result);
  }catch(error) {
    next(error);
  }
 });




module.exports = router;
