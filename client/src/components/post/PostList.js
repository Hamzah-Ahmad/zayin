import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { Link } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

import Post from "./Post";
const PostList = props => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.getPosts(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, props.likes]);

  const onSearch = e => {
    e.preventDefault();
    props.getPosts(search);
  };

  const clearSearch = () => {
    document.getElementById("searchBar").value = "";
    setSearch("");
  };

  return (
    <div>
      <Row>
        <Col xs="12" sm="6">
          <Form>
            <FormGroup onSubmit={onSearch}>
              <Label for="searchBar">Search topics:</Label>
              <Input
                type="select"
                name="topic"
                id="searchBar"
                required
                onChange={e => setSearch(e.target.value)}
                className="mb-1"
                style={{ width: "150px" }}
              >
                <option hidden></option>
                {props.topics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </Input>
              <Button
                onClick={clearSearch}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginTop: "0px"
                }}
              >
                Clear
              </Button>
            </FormGroup>
          </Form>
        </Col>
        <Col xs="12" sm="6" className="newPostCol">
          <Link to="/post/new" className="bgColor btn btn-primary">
            New Post
          </Link>
        </Col>
      </Row>
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
