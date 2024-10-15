const socketIo = require('socket.io');


module.exports = (httpServer) => {
    const io = socketIo(httpServer, {
        cors: {
            origin: 'https://admin-chat-front.vercel.app', // Make sure this matches your frontend URL exactly (no trailing slashes)
            methods: ['GET', 'POST'],
            credentials: true, // Allow credentials (cookies, authorization headers, etc.)
        },
        transports: ['websocket', 'polling'], // Make sure websocket is allowed
    });

    io.use((socket, next) => {
        if (1) {
            // code
            next();
        } else {
            //code
            next();
        };
    })

    return io;
};