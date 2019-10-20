import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import Post from "../post/Post";

import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

const GuestPage = props => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.getPosts(search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
                style={{ width: "160px" }}
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
      </Row>
      <h3 style={{ fontFamily: "Candara" }}>
        Register or Sign in to read full posts, create your own posts, like and
        comment!
      </h3>
      {props.posts.length > 0 ? (
        <div>
          {props.posts.map(post => (
            // <Post key={post._id} post={post} />
            <div className="mt-3">
              <Card style={{ borderRadius: "15px" }}>
                <CardBody
                  style={{ paddingBottom: "0px", paddingTop: "0.1rem" }}
                >
                  <CardTitle
                    style={{
                      fontSize: "13px",
                      marginBottom: "0px"
                    }}
                  >
                    Posted by: {post.user.name}
                    <div className="topicTag ">{post.topic}</div>
                  </CardTitle>

                  <CardText className="postCardTitle">{post.title}</CardText>
                  <span style={{ fontSize: "18px" }}>
                    <i
                      className="fa fa-thumbs-up"
                      style={{ paddingRight: "5px" }}
                    ></i>
                    {post.likes.length}{" "}
                    <i
                      className="fa fa-comments-o ml-4"
                      style={{ paddingRight: "5px" }}
                    ></i>
                    {post.comments.length}
                  </span>
                </CardBody>
              </Card>
            </div>
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
)(GuestPage);

// className="fa fa-thumbs-up"
