const { test, updateUser, deleteUser } = require("../controller/user.controller");
const verifyToken = require("../utils/verifyUser");

const userRoutes = require("express").Router();

userRoutes.get("/", test);
userRoutes.put("/update/:userId", verifyToken, updateUser);
userRoutes.delete("/delete/:userId", verifyToken, deleteUser);

module.exports = userRoutes;
