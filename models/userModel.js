const mongoose = require("mongoose");
const User = require('./userModel'); // Importing the User model

// namespace schema
const userSchema = new mongoose.Schema({
    username: {  // Fixed typo from 'usename' to 'username'
        type: String,
        required: true, // Changed 'require' to 'required'
    },
    role: {
        type: String, // Changed the type to String
        enum: ['user', 'admin'], // Added enum to limit values to 'user' or 'admin'
        default: 'user'
    },
});

// create model
const userModel = mongoose.model('User', userSchema); // Changed 'namespace' to 'User' and fixed the model name

// export model to outside
module.exports = userModel;
