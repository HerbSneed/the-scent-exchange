// server/controllers/userController.js
const User = require('../models/User');

module.exports = {

    createUser: async (req, res) => {
        const { userName, email, password, profilePicture, productsPurched, userRatings } = req.body;
        try {
            const user = await User.create({ userName, email, password, profilePicture, productsPurched, userRatings });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
        } catch (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ message: 'Failed to fetch user' });
        }
    },

    updateUserById: async (req, res) => {
        const { userId } = req.params;
        const { userName, email } = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(userId, { userName, email }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ message: 'Failed to update user' });
        }
    }
};
