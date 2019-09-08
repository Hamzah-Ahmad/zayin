import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { likePost } from "../../actions/postActions";
import {
  Button,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
const Post = props => {
  const { post } = props;
  useEffect(() => console.log(props));
  // console.log(props);
  return (
    <div className="mt-3">
      <Card>
        <CardBody>
          <CardTitle style={{ fontSize: "15px" }}>
            Posted by: {post.user.name}
          </CardTitle>
          <CardSubtitle>{post.topic}</CardSubtitle>
          <CardText>
            <Link to={`/posts/${post._id}`} style={{ fontSize: "50px" }}>
              {post.title}
            </Link>
          </CardText>

          <Button onClick={() => props.likePost(post._id)}>
            {post.likes.includes(props.auth.user._id) ? "Unlike" : "Like"}
          </Button>
          {post.likes.length}
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
