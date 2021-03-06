import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      login: false,
      flash: "",
    };

    this.updateEmailField = this.updateEmailField.bind(this);
    this.updatePasswordField = this.updatePasswordField.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateEmailField(event) {
    this.setState({ email: event.target.value });
  }
  updatePasswordField(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    fetch("/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty("user")) {
          this.props.dispatch({
            type: "TOGGLE_SESSION",
            user: data.user,
            token: data.token,
            message: data.message,
          });
          this.setState({ login: true, message: this.state.flash });
        } else {
          this.setState({ flash: data.message });
          console.log(this.state.flash);
        }
      })
      .catch((err) => this.setState({ flash: err.flash }));
  };

  render() {
    if (this.state.login === true) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="sign_in">
        <h1>Sign In!</h1>

        <form onSubmit={this.handleSubmit} className="sign_in_form">
          <div>
            <TextField
              type="email"
              label="E-mail"
              name="email"
              value={this.state.email}
              onChange={this.updateEmailField}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Password"
              name="password"
              value={this.state.password}
              onChange={this.updatePasswordField}
            />
          </div>

          <div>
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            <Button variant="outlined" color="secondary">
              <Link to="/signup">Sign Up!</Link>
            </Button>
          </div>
        </form>
        {/* {this.state.flash ? (
          <SnackbarContent
            anchororigin={"bottom, center"}
            message={this.state.flash}
          />
        ) : null} */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    flash: state.auth.token,
  };
};

export default connect(mapStateToProps)(withRouter(SignIn));
