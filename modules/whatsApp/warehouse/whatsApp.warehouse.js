const WhatsAppHistory = require('../schemas/whatsAppHistory.schema');

const whatsAppWarehouse = {

  createWhatsAppHistory: async (requestBody) => {
    return await WhatsAppHistory.create(requestBody);
  },
  searchInWhatsAppHistory: async (search, userId, locale) => {
    return await WhatsAppHistory.find(
      { $text: { $search: search }, userId: userId, locale: locale },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } })
    .select("-_id  by content");
  }


}

module.exports = whatsAppWarehouse;