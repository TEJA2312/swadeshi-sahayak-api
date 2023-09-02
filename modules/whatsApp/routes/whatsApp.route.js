const express = require('express');
const router = express.Router();
const whatsAppController = require('../controllers/whatsApp.controller');

router.get('/getContextForGPT', whatsAppController.getContextForGPT);
router.post('/converse', whatsAppController.converse);
router.get('/test_getContextForGPT', whatsAppController.test_getContextForGPT);

module.exports = router