const { createComment } = require("../controller/comment.controller");
const verifyToken = require("../utils/verifyUser");

const commentRoutes = require("express").Router();

commentRoutes.post("/create", verifyToken, createComment);

module.exports = commentRoutes;
