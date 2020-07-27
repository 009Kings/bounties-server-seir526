const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchedBounties: [{
    type: mongoose.Types.ObjectId,
    ref: 'Bounty'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
});



module.exports = mongoose.model('User', userSchema);