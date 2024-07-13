const { createComment, getPostsComment, likeComment } = require("../controller/comment.controller");
const verifyToken = require("../utils/verifyUser");

const commentRoutes = require("express").Router();

commentRoutes.post("/create", verifyToken, createComment);
commentRoutes.get('/getPostComment/:postId', getPostsComment);
commentRoutes.put('/likeComment/:commentId', verifyToken, likeComment);

module.exports = commentRoutes;
