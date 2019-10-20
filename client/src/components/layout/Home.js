import React from "react";
import { connect } from "react-redux";
import { Alert, Container } from "reactstrap";
import PostList from "../post/PostList";
import GuestPage from "./GuestPage";

const Home = props => {
  const { isAuthenticated } = props.auth;

  // Use this is the homepage if user not authenticated
  // const guestPage = (
  //   <div className="guestPage">
  //     <h1 className="guestPageTitle">Welcome to Zayin</h1>
  //     <p className="guestPagePara">
  //       Talk with the internet about your favourite topics.
  //     </p>
  //   </div>
  // );
  const guestPage = <GuestPage />;

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
