const errorHandler = require("../utils/error");
const bcrypt = require("bcrypt");
const USER = require("../model/users.model");

const test = async (req, res) => {
  res.json({
    message: "test message",
  });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to allow to update this user")
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      next(errorHandler(403, "Password must be at least 6 characters"));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 20) {
      return next(
        errorHandler(403, "Username must be in between 5 to 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(403, "Username cannot contain spaces"));
    }
    if (!req.body.username === req.body.username.toLowerCase()) {
      return next(errorHandler(403, "Username should be in lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(403, "Username only contains letters and numbers")
      );
    }
  }
  try {
    const updateUser = await USER.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to allow to delete this Account")
    );
  }
  try {
    await USER.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted Successfully");
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out Successfully");
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;

    const users = await USER.find()
      .skip(startIndex)
      .limit(limit)
      .sort({ username: sortDirection });

    const userWithPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await USER.countDocuments();


    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await USER.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: userWithPassword,
      totalUsers,
      lastMonthUsers: lastMonthUsers,
    });



  } catch (error) {
    next(error);
  }
};

module.exports = { test, updateUser, deleteUser, signOut, getUsers };
