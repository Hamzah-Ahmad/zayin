import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PostDetail from "./components/post/PostDetail";
import NewPost from "./components/post/NewPost";
import { Container } from "reactstrap";
// import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import "./App.css";

import store from "./store";
import { loadUser } from "./actions/authActions";
import AppNavbar from "./components/layout/AppNavbar";
import Home from "./components/layout/Home";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <div>
      <AppNavbar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/posts/:postId" component={PostDetail} />
          <ProtectedRoute exact path="/post/new" component={NewPost} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
