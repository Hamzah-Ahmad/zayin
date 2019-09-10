import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost, deletePost } from "../../actions/postActions";
import { postComment, deleteComment } from "../../actions/commentActions";
import { likePost } from "../../actions/postActions";

import {
  Button,
  Form,
  FormGroup,
  Input,
  ListGroupItem,
  ListGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col
} from "reactstrap";

// TODO:
// fix the equal sign problem on line 59, 60 and 65 (used "eslint-disabled as a temporary fix")
// textarea does not currently have a "requireerd" attribute because it causes a red outline. Fix both here and in the NewPost component

const PostDetail = props => {
  const [comment, setComment] = useState("");
  const [dropdownOpen, setDropDownOpen] = useState(false);
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
  }, [props.comment, props.likes]);
  const onSubmit = e => {
    e.preventDefault();
    props.postComment(postId, comment);
  };
  const delComment = (postId, commentId) => {
    props.deleteComment(postId, commentId);
  };
  const delPost = postId => {
    props.deletePost(postId);
    setTimeout(redirectToHome, 1000);
  };
  const redirectToHome = () => {
    props.history.push("/");
  };

  const toggle = () => {
    setDropDownOpen(!dropdownOpen);
  };

  return (
    <div>
      {props.post ? (
        <div>
          {/* eslint-disable-next-line */}
          {props.post.user._id == props.auth.user._id ? (
            <div className="editBtn">
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <div onClick={toggle} data-toggle="dropdown"></div>

                <DropdownToggle className="customBtn">
                  <i className="fa fa-edit"></i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <Link
                      to={{
                        pathname: `/post/edit/${props.post._id}`,
                        state: {
                          title: props.post.title,
                          content: props.post.content,
                          topic: props.post.topic
                        }
                      }}
                      style={{ color: "black" }}
                    >
                      Edit
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <div onClick={() => delPost(props.post._id)}>Delete</div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            ""
          )}
          <h1 className="postDetailsTitle">{props.post.title}</h1>

          <div className="topicOnDetailPage mb-3">{props.post.topic}</div>

          <div className="mb-3" style={{ fontSize: "20px" }}>
            {props.post.content}
          </div>

          <Button
            onClick={() => props.likePost(props.post._id)}
            style={{
              background: "white",
              border: "0px white solid"
            }}
          >
            {props.post.likes.includes(props.auth.user._id) ? (
              <i
                className="fa fa-thumbs-up "
                style={{ fontSize: "20px", color: "#ee4f2c" }}
              ></i>
            ) : (
              <i
                className="fa fa-thumbs-up"
                style={{ fontSize: "20px", color: "grey" }}
              ></i>
            )}
          </Button>
          <span>{props.post.likes.length}</span>

          <Form onSubmit={onSubmit} className="clearfix mt-3">
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
                <Button className="btn mt-1 float-right bgColor" type="submit">
                  Submit
                </Button>
              </span>
            </FormGroup>
          </Form>
          <ListGroup className="commentBlock">
            {props.post.comments.map(comment => (
              <ListGroupItem
                key={comment._id}
                className="comment"
                style={{ backgroundColor: "#f5f5f5" }}
              >
                <Row>
                  <Col xs="11" style={{ fontSize: "20px" }}>
                    <div style={{ fontWeight: "bold" }}>{comment.userName}</div>
                  </Col>
                  {/* eslint-disable-next-line */}
                  {props.post.user._id == props.auth.user._id ||
                  // eslint-disable-next-line
                  comment.user == props.auth.user._id ? (
                    <Col
                      xs="1"
                      onClick={() => delComment(props.post._id, comment._id)}
                      style={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        textAlign: "right"
                      }}
                    >
                      X
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
                {comment.commentText}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.posts.post,
  likes: state.posts.likes,
  comment: state.comment.comments,
  auth: state.auth
});
export default withRouter(
  connect(
    mapStateToProps,
    { getPost, deletePost, postComment, deleteComment, likePost }
  )(PostDetail)
);
