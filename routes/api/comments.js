const express = require("express");
const router = express.Router();
const CommentModel = require("../../models/Comment");
const Post = require("../../models/Post");
const auth = require("../../middleware/auth");

//@route POST api/posts/comments/:postId
//@desc Post a comment
//@access Private
router.post("/:postId", auth, (req, res) => {
  Post.findById(req.params.postId).then(async foundPost => {
    try {
      foundPost.comments.push({
        user: req.user.id,
        userName: req.user.name,
        commentText: req.body.commentText,
        post_Id: foundPost._id,
        post_user: foundPost.user
      });
      await foundPost.save();
      res.json("Comment created");
    } catch (err) {
      res.json("Error occured while creating comment " + err);
    }
  });
});

//@route GET api/posts/comments/:postId
//@desc Get the post's comments
//@access Public
// router.get("/:postId", (req, res) => {
//   Post.findById(req.params.postId)
//     .populate("comments")
//     .exec((err, post) => {
//       console.log(post);
//       if (err) return err;
//       if (post.comments.length > 0) {
//         res.json(post.comments);
//       } else {
//         res.json("No comments");
//       }
//     });
// });

//@route Delete api/posts/comments/:commentId
//@desc Delete a comment
//@access Private
router.delete("/:postId/:commentId", auth, async (req, res) => {
  Post.findById(req.params.postId).exec((err, post) => {
    const comment = post.comments.id(req.params.commentId);
    if (comment.user == req.user.id || post.user == req.user.id) {
      post.comments.id(req.params.commentId).remove();
      post.save((err, post) => {
        if (err) return res.json(err);
        else {
          return res.json(post);
        }
      });
    } else {
      return res.json("User not authorized to delete this comment");
    }
  });
});

module.exports = router;
//if (comment.user == req.user.id || comment.post_user == req.user.id)
