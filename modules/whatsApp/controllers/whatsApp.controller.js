const whatsAppWarehouse = require('../warehouse/whatsApp.warehouse')
const detectInputLanguage = require('../../../utils/detectLanguage.utils');

const whatsAppController = {

  createWhatsAppHistory: async (req, res, next) => {
    try{
      req.body.locale = await detectInputLanguage(req.body.content);
      const whatsAppHistory = await whatsAppWarehouse.createWhatsAppHistory(req.body);
      return res.status(201).json(whatsAppHistory);

    } catch(error) {
      console.error(error)
      next(error);
    }    
  },

  searchInWhatsAppHistory: async (req, res, next) => {
    try{
      if(!req.query.userId || !req.query.search) throw Object.assign(new Error('userId and search string is required'), { statusCode: 404 });
      
      const locale = await detectInputLanguage(req.query.search);
      const result = await whatsAppWarehouse.searchInWhatsAppHistory(req.query.search, req.query.userId, locale);
      return res.status(200).json(result);

    } catch(error) {
      console.error(error);
      next(error);
    }    
  }

}

module.exports = whatsAppController;