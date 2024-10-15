const { findRoomByUserId, createRoom, getAllRooms, setNewMessageFlags, createMessage } = require("./connection.socket");


module.exports = socketHandler = (io) => {
    findRoomByUserId(io);
    createRoom(io);
    getAllRooms(io);
    createMessage(io);
    setNewMessageFlags(io)
}