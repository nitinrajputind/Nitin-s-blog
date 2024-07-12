const { createComment, getPostsComment } = require("../controller/comment.controller");
const verifyToken = require("../utils/verifyUser");

const commentRoutes = require("express").Router();

commentRoutes.post("/create", verifyToken, createComment);
commentRoutes.get('/getPostComment/:postId', getPostsComment);

module.exports = commentRoutes;
