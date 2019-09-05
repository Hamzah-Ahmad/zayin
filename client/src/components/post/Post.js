import React from "react";
import { Link } from "react-router-dom";
const Post = props => {
  const { post } = props;
  return (
    <div>
      <Link to={`/posts/${post._id}`} className="display-3">
        {post.title}
      </Link>
    </div>
  );
};

export default Post;
