const express = require("express");
const chatRoute = require('./routes/chats');
const userRoute = require('./routes/user')
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

//* BodyParser
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))

//* CORS Policy

//* Template Engine

// * static folder
// app.use(express.static(path.join(__dirname, 'public')))

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true
}));
app.use(cookieParser());


//* Routes
app.use('/chat', chatRoute);
app.use('/user', userRoute);


//* 404 Error handler

module.exports = app;
