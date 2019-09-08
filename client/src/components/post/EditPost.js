import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, Card, CardBody } from "reactstrap";
import { createPost } from "../../actions/postActions";

// TODO:
// Make post content a required field and fix red border which is caused by the required keyword
// Check if removing async and await in submitFunc cause any problems. Remove if they don't.

const EditPost = props => {
  //   const [title, setTitle] = useState("");
  //   const [content, setcontent] = useState("");
  useEffect(() => console.log(props));
  return (
    <Card>
      <CardBody>
        <h3 className="mb-4">New Post: </h3>
        {/* <Form onSubmit={submitFunc}>
          <FormGroup>
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
          <Button type="submit">Submit</Button>
        </Form> */}
      </CardBody>
    </Card>
  );
};

export default connect(
  null,
  { createPost }
)(EditPost);
