const express = require('express');
const router = express.Router();
const whatsAppController = require('../controllers/whatsApp.controller');


router.post('/converse', async (req, res, next)=>{
  try{
   const result = await whatsAppController.converse(req.body); 
   return res.status(201).json(result);
  }catch(error) {
    next(error);
  }
 });

router.get('/getContextForGPT', async (req, res, next)=>{
  try{
   const result = await whatsAppController.getContextForGPT(req.query.question, req.query.userId, req.query.locale); 
   return res.status(201).json(result);
  }catch(error) {
    next(error);
  }
 });

module.exports = router