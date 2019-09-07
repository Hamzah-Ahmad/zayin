import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import { postComment, deleteComment } from "../../actions/commentActions";
import { Button, Form, FormGroup, Input } from "reactstrap";

// TODO:
// fix the equal sign problem on line 59 and 60 (used "eslint-disabled as a temporary fix")
// textarea does not currently have a "requireerd" attribute because it causes a red outline. Fix both here and in the NewPost component

const PostDetail = props => {
  const [comment, setComment] = useState("");
  const { postId } = props.match.params;
  // v Comment regarding useEffect parameters
  //#region
  /*
    In the useEffect below, I initilly placed empty brackets as the second arguument.
    However, new comments were not being rendered (without refresing the page) by this method.
    Because the comments are a part of the post, and posts were being fetched from the api.
    Using empty brackets as the second argument means that the function inside the useEffect --
    only runs on the initial render, NOT every time the page rernders--
    (i.e. everytime the state or props of the component are changed).
    Point to remember, if you put empty brackets as the second argument, the function insdie--
    will only run on the initial render, not after every time the page re-renders--
    (i.e. everytime the component state or props are changed)
    */
  //#endregion
  useEffect(() => {
    props.getPost(postId);
    // console.log(props);
    // eslint-disable-next-line
  }, [props.comment]);
  const onSubmit = e => {
    e.preventDefault();
    props.postComment(postId, comment);
  };
  const delComment = (postId, commentId) => {
    props.deleteComment(postId, commentId);
  };
  return (
    <div>
      {props.post ? (
        <div>
          <h1 className="display-4">{props.post.title}</h1>
          <br />
          <div className="mb-3" style={{ fontSize: "20px" }}>
            {props.post.content}
          </div>
          {/* <h4 className="mb-3">{props.post._id}</h4> */}
          <Form onSubmit={onSubmit} className="clearfix">
            <FormGroup>
              <Input
                type="textarea"
                // required
                name="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Add Comment"
              />
              <span className="input-group-btn">
                <Button
                  className="btn btn-default mt-1 float-right"
                  type="submit"
                >
                  Submit
                </Button>
              </span>
            </FormGroup>
          </Form>
          <div className="commentBlock">
            {props.post.comments.map(comment => (
              <li key={comment._id} className="comment">
                {comment.userName} <br />
                {comment.commentText}
                {/* eslint-disable-next-line */}
                {props.post.user._id == props.auth.user._id ||
                // eslint-disable-next-line
                comment.user == props.auth.user._id ? (
                  <Button
                    className="ml-2"
                    onClick={() => delComment(props.post._id, comment._id)}
                  >
                    Delete
                  </Button>
                ) : (
                  ""
                )}
              </li>
            ))}
          </div>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.posts.post,
  comment: state.comment.comments,
  auth: state.auth
});
export default withRouter(
  connect(
    mapStateToProps,
    { getPost, postComment, deleteComment }
  )(PostDetail)
);
