const socketIo = require('socket.io');


module.exports = (httpServer) => {
    const io = socketIo(httpServer, {
        cors: {
            origin: '*',
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