const { signup, signin } = require("../controller/auth.controller");

const authRoutes = require("express").Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);

module.exports = authRoutes;
