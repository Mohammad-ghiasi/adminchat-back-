const roomModle = require('../models/chatModle')
const User = require('../models/userModel')



// Find a room by userId plus userData
exports.findRoomByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params; // Extract userId from route parameters
        console.log(userId);
        

        // Validate if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the room associated with the userId
        const room = await roomModle.findOne({ isForUser: userId });

        if (!room) {
            // Create the new room
             await roomModle.create({ isForUser: userId });
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
