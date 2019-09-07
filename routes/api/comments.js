const express = require("express");
const router = express.Router();
const CommentModel = require("../../models/Comment");
const Post = require("../../models/Post");
const auth = require("../../middleware/auth");

//@route POST api/posts/comments/:postId
//@desc Post a comment
//@access Private
router.post("/:postId", auth, (req, res) => {
  Post.findById(req.params.postId)
    .then(async foundPost => {
      try {
        var comment = new CommentModel.Comment({
          user: req.user._id,
          userName: req.user.name,
          commentText: req.body.commentText
        });
        foundPost.comments.push(comment);
        await foundPost.save();

        res.json(comment);
      } catch (err) {
        res.json("Error occured while creating comment " + err);
      }
    })
    .catch(err => console.log("Error"));
});

//@route Delete api/posts/comments/:postId/:commentId
//@desc Delete a comment
//@access Private
router.delete("/:postId/:commentId", auth, async (req, res) => {
  Post.findById(req.params.postId).exec((err, post) => {
    if (err) return res.json(err.response);
    const comment = post.comments.id(req.params.commentId);
    if (comment.user == req.user._id || post.user == req.user._id) {
      post.comments.id(req.params.commentId).remove();
      post.save((err, post) => {
        if (err) return res.json(err.response);
        else {
          return res.json(post.comments);
        }
      });
    } else {
      return res.json("User not authorized to delete this comment");
    }
  });
});

module.exports = router;
