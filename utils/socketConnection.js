const socketIo = require('socket.io');


module.exports = (httpServer) => {
    const io = socketIo(httpServer, {
        cors: {
            origin: 'https://admin-chat-front.vercel.app/',
            credentials: true,
        },
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