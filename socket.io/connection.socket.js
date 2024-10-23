const roomModle = require('../models/chatModle');
const User = require('../models/userModel');

exports.getAllRooms = (io) => {
    io.on('connection', (socket) => {

        // Listen for the 'getAllRooms' event from the client
        socket.on('getAllRooms', async () => {
            try {
                // Retrieve all rooms from the database
                const rooms = await roomModle.find({});

                // Emit a success message with the room data
                socket.emit('allRooms', { message: 'Rooms retrieved successfully', data: rooms });
            } catch (error) {
                console.error(error);
                socket.emit('error', { message: 'An error occurred while retrieving rooms', error });
            }
        });

        // Handle socket disconnection
        socket.on('disconnect', () => {
        });
    });
};


exports.findRoomByUserId = (io) => {
    io.on('connection', (socket) => {

        socket.on('findRoomByUserId', async (userId) => {
            try {
                const finalUserId = userId
                // Validate if userId is provided
                if (!finalUserId) {
                    socket.emit('error', { message: 'User ID is required' });
                    return;
                }

                // Find the room associated with the userId
                const room = await roomModle.findOne({ isForUser: finalUserId });

                if (!room) {
                    socket.emit('error', { message: 'Room not found for the provided user' });
                    return;
                }

                // Find the user associated with the userId
                const user = await User.findById(finalUserId);

                if (!user) {
                    socket.emit('error', { message: 'User not found' });
                    return;
                }

                // Emit a success message with the room and user data
                socket.emit('roomFound', { message: 'Room found successfully', data: { room, user } });
            } catch (error) {
                console.error(error);
                socket.emit('error', { message: 'An error occurred', error });
            }
        });

        // Handle socket disconnection
        socket.on('disconnect', () => {
        });
    });
};



exports.createRoom = (io) => {
    io.on('connection', (socket) => {

        // Listen for the 'createRoom' event from the client
        socket.on('createRoom', async (data) => {
            try {
                const isForUser = data; // Extract user ID from the emitted data

                // Validate the input
                if (!isForUser) {
                    socket.emit('error', { message: 'User ID is required to create a room' });
                    return;
                }

                // Validate if the user exists
                const userExists = await User.findById(isForUser);
                if (!userExists) {
                    socket.emit('error', { message: 'User not found' });
                    return;
                }

                // Check if the room already exists for the user
                const roomsExist = await roomModle.findOne({ isForUser });
                if (roomsExist) {
                    socket.emit('roomExists', { message: 'Room already exists!', data: roomsExist });
                    return;
                }

                // Create the new room
                const newRoom = await roomModle.create({ isForUser });

                // Emit a success message with the new room data
                socket.emit('roomCreated', { message: 'Room created successfully', data: newRoom });
            } catch (error) {
                console.error(error);
                socket.emit('error', { message: 'An error occurred', error });
            }
        });

        // Handle socket disconnection
        socket.on('disconnect', () => {
        });
    });
};

exports.createMessage = (io) => {
    io.on('connection', (socket) => {

        // Listen for the 'addMessage' event from the client
        socket.on('addMessage', async ({ message, creator, forUser }) => {
            try {
                // Find the room for the user
                const mainRoom = await roomModle.findOne({ isForUser: forUser });
                if (!mainRoom) {
                    socket.emit('error', { message: 'Room not found!' });
                    return;
                }

                // Create a new message object
                const newMessage = { message, creator };

                // Update the room with the new message
                const finalNewMessage = await roomModle.findOneAndUpdate(
                    { isForUser: forUser },
                    {
                        $push: { messages: newMessage },
                        $set: { hasNewMessage: true }, // Optional: set hasNewMessage to true if needed
                    },
                    { new: true } // Return the updated document
                );

                // Have to use IO to send this to all devisese :)
                // Emit success message back to the client
                io.emit('messageAdded', { message: 'Message added successfully!', finalNewMessage });
                // ----------

            } catch (error) {
                console.error(error); // Log the error for debugging
                socket.emit('error', { message: 'An error occurred while adding the message', error });
            }
        });

        // Handle socket disconnection
        socket.on('disconnect', () => {
        });
    });
};


exports.setNewMessageFlags = (io) => {
    io.on('connection', (socket) => {
        // Listen for the 'setNewMessageFlags' event from the client
        socket.on('setNewMessageFlags', async ({ userId, ATU, UTA }) => {
            try {
                // Validate input
                if (!userId) {
                    socket.emit('error', { message: 'User ID is required' });
                    return;
                }

                // Find the room associated with the userId
                const room = await roomModle.findOne({ isForUser: userId });
                if (!room) {
                    socket.emit('error', { message: 'Room not found for the provided user' });
                    return;
                }

                // Update the new message flags based on the request
                if (ATU !== undefined) {
                    room.newMessageAdminToUser = ATU; // Set flag based on request body
                }

                if (UTA !== undefined) {
                    room.newMessageUserToAdmin = UTA; // Set flag based on request body
                }

                // Save the updated room
                await room.save();

                // Emit a success message with the updated flag data
                socket.emit('messageFlagsUpdated', {
                    message: 'Message flags updated successfully',
                    data: {
                        newATU: room.newMessageAdminToUser,
                        newUTA: room.newMessageUserToAdmin,
                    }
                });
            } catch (error) {
                console.error(error);
                socket.emit('error', { message: 'An error occurred while updating message flags', error });
            }
        });

        // Handle socket disconnection
        socket.on('disconnect', () => {
        });
    });
};