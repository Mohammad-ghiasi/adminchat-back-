const roomModle = require('../models/chatModle')
const User = require('../models/userModel')



// Find a room by userId plus userData
exports.findRoomByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params; // Extract userId from route parameters

        // Validate if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the room associated with the userId
        const room = await roomModle.findOne({ isForUser: userId });

        if (!room) {
            return res.status(404).json({ message: 'Room not found for the provided user' });
        }

        // Find the user associated with the userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Room found successfully', data: { room, user } });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
        console.log(error);
    }
};




exports.createRoom = async (req, res, next) => {
    try {

        const isForUser = req.body.data; // Extract data from request body

        // Validate the input
        if (!isForUser) {
            return res.status(400).json({ message: 'User ID is required to create a room' });
        }

        // Optionally validate the user
        const userExists = await User.findById(isForUser);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const roomsExist = await roomModle.findOne({ isForUser });
        if (roomsExist) {
            return res.status(200).json({ message: 'Room allredy exist!', data: roomsExist });
        }

        // Create the new room
        const newRoom = await roomModle.create({ isForUser });

        return res.status(201).json({ message: 'Room created successfully', data: newRoom });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
        console.log(error);
    }
};

// Create new message
exports.createMessage = async (req, res, next) => {
    try {
        const { message, creator, forUser } = req.body;

        // Find the room for the user
        const mainRoom = await roomModle.findOne({ isForUser: forUser });
        if (!mainRoom) {
            return res.status(404).json({ message: 'Room not found!' });
        }

        // Create a new message object
        const newMessage = { message, creator };

        // Update the room with the new message and set hasNewMessage to true
        await roomModle.findOneAndUpdate(
            { isForUser: forUser },
            {
                $push: { messages: newMessage }
            }
        );

        return res.status(201).json({ message: 'Message added successfully!' });

    } catch (error) {
        next(error);
        console.log(error);
    }
};


// getAllRooms
exports.getAllRooms = async (req, res, next) => {
    try {
    

        // Update hasNewMessage to false
        const rooms = await roomModle.find({});

        return res.status(200).json({ message: 'hasNewMessage set to false successfully!', data: rooms });

    } catch (error) {
        next(error);
        console.log(error);
    }
};


// Set message flags for the room
exports.setNewMessageFlags = async (req, res, next) => {
    try {
        const { userId, ATU, UTA } = req.body; // Extract data from request body

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the room associated with the userId
        const room = await roomModle.findOne({ isForUser: userId });
        if (!room) {
            return res.status(404).json({ message: 'Room not found for the provided user' });
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

        return res.status(200).json({
            message: 'Message flags updated successfully',
            data: {
                newATU: room.newATU,
                newUTA: room.newUTA
            }
        });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
        console.log(error);
    }
};
