const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const USER = require("../model/users");
const errorHandler = require("../utils/error");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if any required field is missing or empty
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }

    // Check if the email is already registered
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      next(errorHandler(400, "Email already registered"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new USER({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.json({
      msg: "User Signup successful",
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || password === "" || email === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await USER.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(400, "invaild email or password"));
    }
    const vaildPassword = bcrypt.compareSync(password, validUser.password);
    if (!vaildPassword) {
      return next(errorHandler(400, "invaild email or password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRETKEY, {
      expiresIn: "30day",
    });

    // to remove the password from the response
    const { password : pass , ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (err) {}
};

module.exports = { signup, signin };
