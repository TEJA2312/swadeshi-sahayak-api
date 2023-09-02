const mongoose = require('mongoose');

const whatsAppHistorySchema = new mongoose.Schema({

  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', 
  },

  role: { 
    type: String, 
    required: true,
    enum: ['user', 'assistant']
  },
  
  mediaUrl: { 
    type: String, 
    required: false,
    trim: true
  },

  content: {
    type: String, 
    required: true,
    trim: true
  },

  multilingualContent: {
    type: String, 
    required: true,
    trim: true
  },
  
  locale: {
    type: String, 
    required: true,
  }

}, { timestamps: true, minimize: false });

whatsAppHistorySchema.index({ multilingualContent: 'text' });

module.exports = mongoose.model('WhatsAppHistory', whatsAppHistorySchema);