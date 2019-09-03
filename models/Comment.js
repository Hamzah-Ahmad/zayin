const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  userName: {
    type: String
  },
  commentText: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
  Comment: Comment,
  CommentSchema: CommentSchema
};
