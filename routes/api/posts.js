const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

//@route POST api/auth
//@desc Create Post
//@access Private
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content
    });
    res.json("New Post created");
  } catch (err) {
    res.json(`Error occured at post's root POST route: ${err}`);
  }
});

//@route GET api/posts
//@desc Get Posts
//@access Private
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.json(`Error occured at post's root GET method: ${err}`);
  }
});

//@route DELETE api/posts
//@desc Delete Post
//@access Private
router.delete("/:postId", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.postId });
    res.json("Post deleted");
  } catch (err) {
    res.json(`Error occured at post's delete route: ${err}`);
  }
});

//@route PATCH api/posts
//@desc Update Post
//@access Private
router.patch("/:postId", async (req, res) => {
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
