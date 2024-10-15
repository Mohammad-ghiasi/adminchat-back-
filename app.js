const express = require("express");
const chatRoute = require('./routes/chats');
const userRoute = require('./routes/user');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

//* BodyParser
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

//* CORS Policy
app.use(cors({
    origin: 'https://admin-chat-front.vercel.app', // Remove the trailing slash here
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(cookieParser());

//* Routes
app.use('/chat', chatRoute);
app.use('/user', userRoute);

//* 404 Error handler
app.use((req, res, next) => {
    res.status(404).send('Resource not found');
});

module.exports = app;
