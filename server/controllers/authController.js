const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

//   Public are restricted in production 
// const registerAdmin = async (req, res, next) => {
//     const { username, password } = req.body;

//     try {
//         // Basic check to prevent multiple admins for this simple app
//         const existingUser = await User.findOne({ username: 'admin' });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Admin user already exists.' });
//         }

//         const user = await User.create({ username, password });

//         res.status(201).json({
//             message: 'Admin user registered successfully.',
//             username: user.username,
//             token: generateToken(user._id),
//         });
//     } catch (err) {
//         next(err);
//     }
// };


// access to Public
const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    registerAdmin,
    loginUser,
};