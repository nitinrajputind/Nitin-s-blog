const { signup, signin, googleAuth } = require("../controller/auth.controller");

const authRoutes = require("express").Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
authRoutes.post('/google', googleAuth);

module.exports = authRoutes;
