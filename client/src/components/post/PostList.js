import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";

import Post from "./Post";
const PostList = props => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.getPosts(search);
    console.log(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, props.likes]);

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
            className=" clearfix mb-4"
            style={{ width: "20%", float: "right" }}
          >
            <option hidden></option>
            {props.topics.map(topic => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Form>
      <Link to="/post/new" className="bgColor btn btn-primary">
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
        <div
          style={{ textAlign: "center", marginTop: "20%" }}
          className="display-4"
        >
          Sorry. We didn't find any posts.
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
  topics: state.posts.topics,
  likes: state.posts.likes
});
export default connect(
  mapStateToProps,
  { getPosts }
)(PostList);
