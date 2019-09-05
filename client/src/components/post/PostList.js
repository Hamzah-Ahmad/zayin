import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import Post from "./Post";

const PostList = props => {
  useEffect(() => {
    props.getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {props.posts ? (
        <div>
          {props.posts.map(post => (
            <Post key={post._id} post={post} />
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
