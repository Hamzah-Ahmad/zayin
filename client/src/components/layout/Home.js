import React from "react";
import { connect } from "react-redux";
import { Alert, Container } from "reactstrap";
import PostList from "../post/PostList";

const Home = props => {
  const { isAuthenticated } = props.auth;

  // Use this is the homepage if user not authenticated
  const guestPage = (
    <React.Fragment>
      <h1 className="display-1">Welcome to Zayin</h1>
      <p className="display-4">
        Talk to the internet about your favourite topics.
      </p>
    </React.Fragment>
  );

  // Use this is the homepage if user is authenticated
  const homePage = <PostList />;
  return (
    <div>
      <Container>
        {props.location.state && !isAuthenticated ? (
          <Alert color="danger">{props.location.state.msg}</Alert>
        ) : null}
        {!props.auth.isAuthenticated ? guestPage : homePage}
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
