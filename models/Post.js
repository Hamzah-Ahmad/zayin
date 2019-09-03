const mongoose = require("mongoose");
const CommentModel = require("./Comment");
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [CommentModel.CommentSchema],
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
