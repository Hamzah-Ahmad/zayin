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
                commentText: req.body.commentText,
                post_Id: foundPost._id,
                post_user: foundPost.user
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
//@desc Get the post's comments
//@access Public
router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId).populate("comments").exec((err, post) => {
        console.log(post)
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
router.delete("/:commentId", auth, async (req, res) => {
    Comment.findById(req.params.commentId).exec(async (err, comment) => {
        if (err) {
            return res.json(err)
        }
        if (comment.user == req.user.id || comment.post_user == req.user.id) {
            try {
                await Comment.deleteOne({ _id: req.params.commentId });
                res.json("Comment deleted");
            } catch (err) {
                res.json(`Error occured at post's delete route: ${err}`);
            }
        }
        else {
            res.json('Not authorized to delete')
        }
    })




});


module.exports = router;
