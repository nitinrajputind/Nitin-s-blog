const { test, updateUser, deleteUser, signOut, getUsers, getUser } = require("../controller/user.controller");
const verifyToken = require("../utils/verifyUser");

const userRoutes = require("express").Router();

userRoutes.get("/", test);
userRoutes.put("/update/:userId", verifyToken, updateUser);
userRoutes.delete("/delete/:userId", verifyToken, deleteUser);
userRoutes.post("/signout", signOut);
userRoutes.get("/getUsers", verifyToken, getUsers);
userRoutes.get('/:userId', getUser);

module.exports = userRoutes;
