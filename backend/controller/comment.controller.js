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

const likeComment = async (req, res, next) => {
  try {
    const comment = await COMMENT.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = await comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberofLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberofLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

const editComment = async (req, res, next) => {
  try {
    const comment = await COMMENT.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }
    const editedComment = await COMMENT.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await COMMENT.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }
    await COMMENT.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, " You are not allowed to get all comments"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "'desc" ? -1 : 1;
    const comments = await COMMENT.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await COMMENT.countDocuments();
    const now = new Date();

    const oneMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthComments = await COMMENT.countDocuments({
      createdAt: { $gte: oneMonth },
    });

    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getPostsComment,
  likeComment,
  editComment,
  deleteComment,
  getComments,
};
