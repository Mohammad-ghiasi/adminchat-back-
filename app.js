const express = require("express");
const chatRoute = require('./routes/chats');
const userRoute = require('./routes/user');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

//* BodyParser
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

// * CORS Policy
app.use(cors({
    origin: 'http://localhost:3000', // Corrected URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Add this line to allow credentials
}));

    //https://admin-chat-front.vercel.app


app.use(cookieParser());

//* Routes
app.use('/chat', chatRoute);
app.use('/user', userRoute);



module.exports = app;
