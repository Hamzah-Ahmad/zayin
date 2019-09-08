import React from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
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
          {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
          <CardText>
            <Link to={`/posts/${post._id}`} style={{ fontSize: "50px" }}>
              {post.title}
            </Link>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Post;
