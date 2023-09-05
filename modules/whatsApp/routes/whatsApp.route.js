const express = require('express');
const router = express.Router();
const whatsAppController = require('../controllers/whatsApp.controller');
const phoneToUserId =  require('../../../middlewares/phoneToUserId.middleware');


router.post('/converse', phoneToUserId, async (req, res, next)=>{
  try{
   const result = await whatsAppController.converse(req.body, req.userId); 
   return res.status(201).json(result);
  }catch(error) {
    next(error);
  }
 });

router.get('/getContextForGPT', phoneToUserId, async (req, res, next)=>{
  try{
   const result = await whatsAppController.getContextForGPT(req.query.question, req.userId, req.query.locale); 
   return res.status(201).json(result);
  }catch(error) {
    next(error);
  }
 });

module.exports = router