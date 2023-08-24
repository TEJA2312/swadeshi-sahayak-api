const WhatsAppHistory = require('../schemas/whatsAppHistory.schema');

const whatsAppWarehouse = {

  createWhatsAppHistory: async (requestBody) => {
    return await WhatsAppHistory.create(requestBody);
  },
  searchInWhatsAppHistory: async (search) => {
    return await WhatsAppHistory.find({ $text: { $search: search } });
  }

}

module.exports = whatsAppWarehouse;