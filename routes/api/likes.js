const express = require("express");
const router = express.Router();
const CommentModel = require("../../models/Comment");
const Post = require("../../models/Post");
const auth = require("../../middleware/auth");
//@route POST api/posts/likes/:postId
//@desc Like/Unlike a post
//@access Private
router.post("/:postId", auth, (req, res) => {
  Post.findById(req.params.postId)
    .then(async foundPost => {
      try {
        if (foundPost.likes.includes(req.user._id)) {
          foundPost.likes = foundPost.likes.filter(
            user => user._id != req.user._id
          );
        } else {
          foundPost.likes.push(req.user._id);
        }
        await foundPost.save();

        res.json(foundPost.likes);
      } catch (err) {
        res.json("Error occured while creating comment " + err);
      }
    })
    .catch(err => console.log("Error"));
});

module.exports = router;
