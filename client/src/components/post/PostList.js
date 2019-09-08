import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { Link } from "react-router-dom";

import Post from "./Post";

const PostList = props => {
  useEffect(() => {
    props.getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => console.log(props.posts));

  return (
    <div>
      <Link to="/post/new" className="btn btn-primary">
        New Post
      </Link>
      {props.posts.length > 0 ? (
        <div>
          {props.posts.map(post => (
            <Post key={post._id} post={post} />
            // <div>{post}</div>
          ))}
        </div>
      ) : (
        <div>No Posts Found</div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.posts
});
export default connect(
  mapStateToProps,
  { getPosts }
)(PostList);
