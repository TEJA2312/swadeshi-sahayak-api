const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  firstName: { 
    type: String, 
    required: true,
    trim: true, 
  },

  lastName: { 
    type: String, 
    required: true,
    trim: true, 
  },

  dailCode: {
    type: String, 
    required: true,
    enum: ['+91'],
    default: '+91'
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (number) {
        return /^[0-9]{10}$/.test(number);
      },
      message: 'Phone number should be a string of 10 digits without spaces.'
    }
  },

  email:{
    type: String, 
    required: false,
    validate: {
      validator: function (email) {
        return /^\S+@\S+\.\S+$/.test(email);
      },
      message: 'Invalid Email'
    }
  },

  whatsAppSubExpiry: {
    type: Date,
    default: null
  },

  verified: { 
    type: Boolean, 
    default: false, 
    required: true,
  },

  documentStatus: { 
    type: Number, 
    default: 1, 
    required: true,
  },

}, { timestamps: true, minimize: false });

module.exports = mongoose.model('User', userSchema);