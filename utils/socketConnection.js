const socketIo = require('socket.io');


module.exports = (httpServer) => {
    const io = socketIo(httpServer, {
        cors: {
            origin: 'https://admin-chat-front.vercel.app', // Make sure this matches your frontend URL exactly (no trailing slashes)
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        },
        transports: ['websocket', 'polling'], // Make sure websocket is allowed
    });

    return io;
};