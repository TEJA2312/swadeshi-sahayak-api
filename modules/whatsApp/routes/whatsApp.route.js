const express = require('express');
const router = express.Router();
const whatsAppController = require('../controllers/whatsApp.controller');

router.post('/createWhatsAppHistory', whatsAppController.createWhatsAppHistory);
router.get('/searchInWhatsAppHistory', whatsAppController.searchInWhatsAppHistory);

module.exports = router