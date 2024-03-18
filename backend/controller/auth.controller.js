const bcrypt = require('bcrypt');
const USER = require("../model/users");
const errorHandler = require('../utils/error');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if any required field is missing or empty
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            next(errorHandler(400, 'All fields are required'));
        }

        // Check if the email is already registered
        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            next(errorHandler(400, 'Email already registered'));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new USER({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        res.json({
            msg: "User Signup successful"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { signup };