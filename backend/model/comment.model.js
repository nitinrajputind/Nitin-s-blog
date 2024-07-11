const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    like: {
      type: Array,
      default: [],
    },
    numberofLike: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const COMMENT = mongoose.model("COMMENT", commentSchema);

module.exports = COMMENT;
