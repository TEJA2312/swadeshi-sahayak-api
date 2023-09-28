const express = require('express');
const router = express.Router();
const whatsAppController = require('../controllers/whatsApp.controller');
const verifyToken =  require('../../../middlewares/verifyToken.middlewares');


router.post('/converse', verifyToken, async (req, res, next)=>{
  try{
   const result = await whatsAppController.converse(req.body, req.userId); 
   return res.status(201).json(result);
  }catch(error) {
    next(error);
  }
 });

router.get('/getAllMessages', verifyToken, async (req, res, next)=>{
  try{
   const result = await whatsAppController.getAllMessages(req.userId); 
   return res.status(201).json(result);
  }catch(error) {
    next(error);
  }
 });

module.exports = router