import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { likePost } from "../../actions/postActions";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
const Post = props => {
  const { post } = props;
  // useEffect(() => console.log(props));
  return (
    <div className="mt-3">
      <Card>
        <CardBody>
          <CardTitle style={{ fontSize: "15px", textDecoration: "underline" }}>
            Posted by: {post.user.name}
          </CardTitle>
          <CardSubtitle className="topicTag">{post.topic}</CardSubtitle>
          <CardText className="postCardTitle">
            <Link
              to={`/posts/${post._id}`}
              style={{ fontSize: "40px", color: "#383838" }}
            >
              {post.title}
            </Link>
          </CardText>
          <Link
            onClick={() => props.likePost(post._id)}
            style={{ marginLeft: "10px", marginRight: "5px" }}
          >
            {post.likes.includes(props.auth.user._id) ? (
              <i
                class="fa fa-thumbs-up"
                style={{ fontSize: "20px", color: "#ee4f2c" }}
              ></i>
            ) : (
              <i
                class="fa fa-thumbs-up"
                style={{ fontSize: "20px", color: "grey" }}
              ></i>
            )}
          </Link>
          <span style={{ fontSize: "20px" }}> {post.likes.length}</span>
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
