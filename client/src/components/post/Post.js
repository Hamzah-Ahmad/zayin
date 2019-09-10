import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { likePost } from "../../actions/postActions";
import { Button, Card, CardText, CardBody, CardTitle } from "reactstrap";
const Post = props => {
  const { post } = props;
  // useEffect(() => console.log(props));
  return (
    <div className="mt-3">
      <Card style={{ borderRadius: "15px" }}>
        <CardBody style={{ paddingBottom: "0px", paddingTop: "0.1rem" }}>
          <CardTitle
            style={{
              fontSize: "13px",
              marginBottom: "0px"
            }}
          >
            Posted by: {post.user.name}
            <div className="topicTag ">{post.topic}</div>
          </CardTitle>

          <CardText className="postCardTitle">
            <Link to={`/posts/${post._id}`} style={{ color: "#383838" }}>
              {post.title}
            </Link>
          </CardText>
          <Button
            onClick={() => props.likePost(post._id)}
            style={{
              background: "white",
              border: "0px white solid"
            }}
          >
            {post.likes.includes(props.auth.user._id) ? (
              <i
                className="fa fa-thumbs-up"
                style={{ fontSize: "18px", color: "#ee4f2c" }}
              ></i>
            ) : (
              <i
                className="fa fa-thumbs-up"
                style={{
                  fontSize: "18px",
                  color: "grey"
                }}
              ></i>
            )}
          </Button>
          <span style={{ fontSize: "18px" }}> {post.likes.length}</span>
        </CardBody>
      </Card>
    </div>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { likePost }
)(Post);
