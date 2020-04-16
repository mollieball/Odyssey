import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

export default function (ComposedComponent) {
  class NotAuthentication extends Component {
    componentDidMount() {
      if (this.props.authenticated) this.props.history.push("/profile");
    }
    componentDidUpdate() {
      if (!this.props.authenticated) this.props.history.push("/signin");
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { authenticated: state.auth.token ? true : false };
  }
  return connect(mapStateToProps)(withRouter(NotAuthentication));
}
