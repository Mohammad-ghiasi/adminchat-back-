const socketIo = require('socket.io');

module.exports = (httpServer) => {
    const io = socketIo(httpServer, {
        cors: {
            origin: 'http://localhost:3000', // Make sure this matches your frontend URL exactly (no trailing slashes)
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true // Add this line to support credentials
        }
    });
    //https://admin-chat-front.vercel.app

    return io;
};
