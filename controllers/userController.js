const userModle = require('../models/userModel')


// get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const { userId } = req.query; // Extract userId from query parameters

        let allUsers;
        if (userId) {
            // If userId is provided, find the specific user
            allUsers = await userModle.findById(userId);
            if (!allUsers) {
                return res.status(404).json({ message: 'User not found' });
            }
        } else {
            // If no userId, return all users
            allUsers = await userModle.find();
        }

        return res.status(200).json({ message: 'Users sent successfully', data: allUsers });
    } catch (error) {
        next(error);
        console.log(error);
    }
};



// get all users (login)
exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.query; // Extract userId from query parameters

        
        if (userId) {
            // If userId is provided, find the specific user
            const user = await userModle.findById(userId);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            res.cookie('userData', JSON.stringify({user}), {
                httpOnly: false, // Accessible only by the server
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            res.status(200).json({ message: 'Users sent successfully', data: user });
        } 

    } catch (error) {
        next(error);
        console.log(error);
    }
};


// crete new user
exports.createUser = async (req, res, next) => {
    try {
        const { username, role } = req.body;

        if (!username || !role) {
            return res.status(400).json({ message: 'Username and role are required' });
        };

        const newUser = await userModle.create({ username, role });
        newUser.save();

        // Set a cookie with the username and role
        res.cookie('userData', JSON.stringify({ username, role, userId: newUser._id }), {
            httpOnly: false, // Accessible only by the server
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(201).json({ message: 'Data received and cookie set', newUser });

    } catch (error) {
        next(error);
        console.log(error);
    };
};