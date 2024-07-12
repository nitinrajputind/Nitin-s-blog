const COMMENT = require("../model/comment.model");
const errorHandler = require("../utils/error");

const createComment = async (req, res, next) => {
  try {
    const { comment, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, " You are not allowed to create a comment")
      );
    }

    const newComment = new COMMENT({
      content: comment,
      postId,
      userId,
    });

    await newComment.save();
    res.status(201).json({ newComment });
  } catch (error) {
    next(error);
  }
};

const getPostsComment = async (req, res, next) => {
  try {
    const comments = await COMMENT.find({ postId: req.params.postId }).sort({
      createAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

module.exports = { createComment , getPostsComment };
