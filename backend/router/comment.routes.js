const {
  createComment,
  getPostsComment,
  likeComment,
  editComment,
  deleteComment,
  getComments,
} = require("../controller/comment.controller");
const verifyToken = require("../utils/verifyUser");

const commentRoutes = require("express").Router();

commentRoutes.post("/create", verifyToken, createComment);
commentRoutes.get("/getPostComment/:postId", getPostsComment);
commentRoutes.put("/likeComment/:commentId", verifyToken, likeComment);
commentRoutes.put("/editComment/:commentId", verifyToken, editComment);
commentRoutes.delete("/deleteComment/:commentId", verifyToken, deleteComment);
commentRoutes.get('/getComments', verifyToken, getComments);

module.exports = commentRoutes;
