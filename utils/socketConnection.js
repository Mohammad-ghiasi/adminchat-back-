const socketIo = require('socket.io');


module.exports = (httpServer) => {
    const io = socketIo(httpServer, {
        cors: {
            origin: '*', // Make sure this matches your frontend URL exactly (no trailing slashes)

        }

    });

    return io;
};