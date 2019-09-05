import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import { postComment, deleteComment } from "../../actions/commentActions";
import { Button, Form, FormGroup, Input } from "reactstrap";

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
    console.log(props);
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
          <h1 className="display-3">{props.post.title}</h1>
          <br />
          <h4 className="mb-3">{props.post.content}</h4>
          <h4 className="mb-3">{props.post._id}</h4>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input
                type="text"
                required
                name="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </FormGroup>
          </Form>
          {props.post.comments.map(comment => (
            <li key={comment._id}>
              {comment.userName} : {comment.commentText}
              {props.post.user._id == props.auth.user._id ||
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
