const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./userModel'); // Import the User model

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
