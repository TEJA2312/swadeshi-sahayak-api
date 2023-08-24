const mongoose = require('mongoose');

const whatsAppHistorySchema = new mongoose.Schema({

  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },

  by: { 
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
  }

}, { timestamps: true, minimize: false });

whatsAppHistorySchema.index({ content: 'text' });

module.exports = mongoose.model('WhatsAppHistory', whatsAppHistorySchema);