const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  firstName: { 
    type: String, 
    required: true,
    trim: true, 
  },

  lastName: { 
    type: String, 
    required: false,
    trim: true, 
  },

  email:{
    type: String, 
    unique: true,
    required: true,
    validate: {
      validator: function (email) {
        return /^\S+@\S+\.\S+$/.test(email);
      },
      message: 'Invalid Email'
    }
  },

  jwtToken:{
    type: String, 
    required: false,
  },

  emailVerified:{
    type: Boolean, 
    default: false,
    required: false,
  }

}, { timestamps: true, minimize: false });

module.exports = mongoose.model('User', userSchema);