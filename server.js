// app.js
const app = require('./app');
const dotenv = require("dotenv");
const http = require('http');
const socketIoConnection = require("./utils/socketConnection");
const socketHandler = require('./socket.io/socketIndex')
const mongoose = require('mongoose');
dotenv.config();


//* Database Connection
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    } catch (err) {
        console.log(`Error Connection To MongoDB: ${err}`);
        process.exit(1);
    }
};


// Start app
const startServer = () => {
    const port = process.env.PORT || 3001;
    const httpServer = http.createServer(app);
    // IO
    const io = socketIoConnection(httpServer);
    // Io conection handler
    socketHandler(io);
    httpServer.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

const run = async () => {
    await connectToDB();
    startServer();
};

run()