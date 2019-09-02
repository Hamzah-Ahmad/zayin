const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
//@route POST api/posts
//@desc Create Post
//@access Private
router.post("/", auth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id
    });
    res.json(newPost);
  } catch (err) {
    res.json(`Error occured at post's root POST route: ${err}`);
  }
});

//@route GET api/posts
//@desc Get Posts
//@access Public
router.get("/", (req, res) => {
  try {
    Post.find({})
      .populate("user", ["name", "email"])
      .exec((err, posts) => {
        if (posts.length > 0) {
          return res.json(posts);
        } else {
          return res.json("No posts");
        }
      });
  } catch (err) {
    res.json(`Error occured at post's root GET method: ${err}`);
  }
});

//@route DELETE api/:post
//@desc Delete Post
//@access Private
router.delete("/:postId", auth, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.postId });
    res.json("Post deleted");
  } catch (err) {
    res.json(`Error occured at post's delete route: ${err}`);
  }
});

//@route PATCH api/:postId
//@desc Update Post
//@access Private
router.patch("/:postId", auth, async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { title: req.body.title, content: req.body.content }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json(`Error occured at post's patch route: ${err}`);
  }
});

module.exports = router;
