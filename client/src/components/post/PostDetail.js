import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";

const PostDetail = props => {
  const { postId } = props.match.params;
  useEffect(() => {
    props.getPost(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {props.post ? (
        <div>
          <h1 className="display-3">{props.post.title}</h1>
          <br />
          <h4>{props.post.content}</h4>
          {/* {props.post.comments.map(comment => (
            <li>{comment}</li>
          ))} */}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.posts.post
});
export default withRouter(
  connect(
    mapStateToProps,
    { getPost }
  )(PostDetail)
);
