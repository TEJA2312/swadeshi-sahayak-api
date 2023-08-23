const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({

  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },

  otp: {
    type: String, 
    required: true
  },

  createdAt: {
    type: Date,
    required: true
  }
  
}, { minimize: false });

module.exports = mongoose.model('Otp', otpSchema);
