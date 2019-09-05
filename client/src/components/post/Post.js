import React from "react";

const Post = props => {
  const { post } = props;
  return (
    <div>
      <h1 className="display-3">{post.title}</h1>
    </div>
  );
};

export default Post;
