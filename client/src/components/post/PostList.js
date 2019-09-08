import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";

import Post from "./Post";
const PostList = props => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.getPosts(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onSearch = e => {
    e.preventDefault();
    props.getPosts(search);
  };
  return (
    <div>
      <Form>
        <FormGroup onSubmit={onSearch}>
          <Input
            type="select"
            name="topic"
            required
            onChange={e => setSearch(e.target.value)}
            className="mb-4"
          >
            <option></option>
            <option value="Science">Science</option>
            <option value="Politics">Politics</option>
            <option value="Movies">Movies</option>
          </Input>
        </FormGroup>
      </Form>

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
