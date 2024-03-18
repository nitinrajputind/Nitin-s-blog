const bcrypt = require('bcrypt');
const USER = require("../model/users");

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if any required field is missing or empty
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Check if the email is already registered
        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists' });
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
        console.error('Error in signup:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

module.exports = { signup };