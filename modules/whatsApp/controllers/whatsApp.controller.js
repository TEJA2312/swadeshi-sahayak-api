const whatsAppWarehouse = require('../warehouse/whatsApp.warehouse')

const whatsAppController = {

  createWhatsAppHistory: async (req, res, next) => {
    try{
      const whatsAppHistory = await whatsAppWarehouse.createWhatsAppHistory(req.body);
      return res.status(201).json(whatsAppHistory);
    } catch(error) {
      console.error(error)
      next(error);
    }    
  },

  searchInWhatsAppHistory: async (req, res, next) => {
    try{
      const result = await whatsAppWarehouse.searchInWhatsAppHistory(req.query.search);
      return res.status(200).json(result);
    } catch(error) {
      console.error(error)
      next(error);
    }    
  }

}

module.exports = whatsAppController;