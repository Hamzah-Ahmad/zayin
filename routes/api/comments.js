const express = require("express");
const router = express.Router();
const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const auth = require("../../middleware/auth");

//@route POST api/posts/comments/:postId
//@desc Post a comment
//@access Private
router.post("/:postId", auth, (req, res) => {
    Post.findById(req.params.postId).then(async foundPost => {
        try {
            const newComment = await Comment.create({
                user: req.user.id,
                userName: req.user.name,
                commentText: req.body.commentText
            })
            foundPost.comments.push(newComment);
            await foundPost.save();
            res.json(newComment);

        } catch (err) {
            res.json("Error occured while creating comment " + err);
        }
    });

});



//@route GET api/posts/comments/:postId
//@desc Get the psot's comments
//@access Public
router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId).populate("comments").exec((err, post) => {
        if (err) return err;
        if (post.comments.length > 0) {
            res.json(post.comments);

        }
        else {
            res.json("No comments");
        }

    });
});

//@route Delete api/posts/comments/:commentId
//@desc Delete a comment
//@access Private
router.delete("/:postId", auth, async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.postId });
        res.json("Post deleted");
    } catch (err) {
        res.json(`Error occured at post's delete route: ${err}`);
    }
});


module.exports = router;
