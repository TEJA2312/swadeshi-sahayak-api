const WhatsAppHistory = require('../schemas/whatsAppHistory.schema');
const mongoose = require('mongoose');

const whatsAppWarehouse = {

  createWhatsAppHistory: async (requestBody) => {
    return await WhatsAppHistory.create(requestBody);
  },
  
  getAllMessages: async (userId) => {
    return await WhatsAppHistory.find({ userId: userId });
  },

  searchInWhatsAppHistory: async (search, userId, locale) => {
    return await WhatsAppHistory.aggregate([
      {
        $match: {
          $text: { $search: search },
          userId: new mongoose.Types.ObjectId(userId),
          locale: locale,
        }
      },
      {
        $addFields: {
          score: { $meta: "textScore" }
        }
      },
      {
        $match: { score: { $gte: 1 } }
      },
      {
        $sort: { createdAt: 1 } // oldest first
      },
      {
        $project: {
          _id: 0,
          role: 1,
          content: 1
        }
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
        $sort: { createdAt: -1 } // newest first
      },
      {
        $limit: 10 
      },
      {
        $sort: { createdAt: 1 } // oldest first
      },
      {
        $project: {
          _id: 0,
          role: 1,
          content: 1
        }
      }
    ]);
  }
  
}

module.exports = whatsAppWarehouse;