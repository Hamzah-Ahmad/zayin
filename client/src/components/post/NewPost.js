import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Input } from "reactstrap";
import { createPost } from "../../actions/postActions";

// TODO:
// Make post content a required field and fix red border which is caused by the required keyword

const NewPost = props => {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const submitFunc = async e => {
    e.preventDefault();
    await props.createPost(title, content);
    setTimeout(redirectToHome, 1000);
  };
  const redirectToHome = () => {
    props.history.push("/");
  };
  return (
    <div>
      <Form onSubmit={submitFunc}>
        <FormGroup>
          <Input
            type="text"
            name="title"
            required
            value={title}
            placeholder="Post Title"
            onChange={e => setTitle(e.target.value)}
          />
          <Input
            type="textarea"
            name="text"
            //required
            value={content}
            placeholder="Post Content"
            onChange={e => setcontent(e.target.value)}
          />
        </FormGroup>
        <Input type="submit" value="Submit" />
      </Form>
    </div>
  );
};

export default connect(
  null,
  { createPost }
)(NewPost);
