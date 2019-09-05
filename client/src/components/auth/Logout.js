import React, { Component, Fragment } from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { withRouter } from "react-router-dom";

export class Logout extends Component {
  render() {
    const onclickFunc = () => {
      this.props.history.push("/");
      this.props.logout();
    };
    return (
      <Fragment>
        <NavLink onClick={onclickFunc} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    null,
    { logout }
  )(Logout)
);
