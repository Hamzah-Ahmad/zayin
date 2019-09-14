import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  Label
} from "reactstrap";
import { createPost } from "../../actions/postActions";

// TODO:
// Make post content a required field and fix red border which is caused by the required keyword
// Check if removing async and await in submitFunc cause any problems. Remove if they don't.

const NewPost = props => {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [topic, setTopic] = useState("");
  const submitFunc = async e => {
    e.preventDefault();
    await props.createPost(title, content, topic);
    setTimeout(redirectToHome, 1000);
  };
  const redirectToHome = () => {
    props.history.push("/");
  };
  return (
    <Card>
      <CardBody>
        <h3 className="mb-4">New Post: </h3>
        <Form onSubmit={submitFunc}>
          <FormGroup>
            <Label for="search">Topic:</Label>
            <Input
              type="select"
              name="topic"
              id="search"
              required
              onChange={e => setTopic(e.target.value)}
              className="mb-4"
              style={{ width: "160px" }}
            >
              <option hidden></option>
              {props.topics.map(topic => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </Input>
            <Input
              type="text"
              name="title"
              required
              value={title}
              placeholder="Post Title"
              onChange={e => setTitle(e.target.value)}
              className="mb-4"
            />
            <Input
              type="textarea"
              name="text"
              //required
              value={content}
              placeholder="Post Content"
              onChange={e => setcontent(e.target.value)}
              className="mb-3"
              style={{ height: 250 }}
            />
          </FormGroup>
          <Button type="submit" className="bgColor">
            Submit
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = state => ({
  topics: state.posts.topics
});
export default connect(
  mapStateToProps,
  { createPost }
)(NewPost);
