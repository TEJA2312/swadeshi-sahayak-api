const WhatsAppHistory = require('../schemas/whatsAppHistory.schema');
const mongoose = require('mongoose');

const whatsAppWarehouse = {

  createWhatsAppHistory: async (requestBody) => {
    return await WhatsAppHistory.create(requestBody);
  },

  searchInWhatsAppHistory: async (search, userId, locale) => {
    return await WhatsAppHistory.aggregate([
      {
        $match: {
          $text: { $search: search },
          userId: new mongoose.Types.ObjectId(userId),
          locale: locale,
          score: { $gte: 1 } 
        }
      },
      {
        $project: {
          _id: 0,
          role: 1,
          content: 1
        }
      },
      {
        $sort: { createdAt: 1 }
      }
    ]);
  },
  

  getLatestWhatsAppHistory: async (userId) => {

    // get latest 10 documents but return them in oldest first order
    return await WhatsAppHistory.aggregate([
      { 
        $match: { userId: new mongoose.Types.ObjectId(userId) }
      },
      {
        $sort: { createdAt: -1 } 
      },
      {
        $limit: 10 
      },
      {
        $project: {
          _id: 0,
          role: 1,
          content: 1
        }
      },
      {
        $sort: { createdAt: 1 } 
      }
    ]);
  }
  
}

module.exports = whatsAppWarehouse;