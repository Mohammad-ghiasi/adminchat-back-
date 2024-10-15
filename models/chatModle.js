const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./userModel'); // Importing the User model



// Message schema
const MessageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    creator: {
        type: String, // Changed the type to String
        enum: ['user', 'admin'], // Added enum to limit values to 'user' or 'admin'
        default: 'user'
    },
});

// Room schema
const RoomSchema = new Schema({
    isForUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: {
        type: [MessageSchema],
        default: [],
    },
    newMessageAdminToUser: {
        type: Boolean,
        default: false,
    },
    newMessageUserToAdmin: {
        type: Boolean,
        default: false,
    }
});

const roomModle = mongoose.model('Room', RoomSchema);

module.exports =  roomModle ;
