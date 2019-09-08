import React from "react";
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
          <Button onClick={() => props.likePost(post._id)}>Like</Button>
          {post.likes.length}
        </CardBody>
      </Card>
    </div>
  );
};

export default connect(
  null,
  { likePost }
)(Post);
