import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withRouter, Link, Redirect } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      verifyPassword: "",
      firstName: "",
      lastName: "",
      flash: "",
    };

    this.updateEmailField = this.updateEmailField.bind(this);
    this.updatePasswordField = this.updatePasswordField.bind(this);
    this.updateVerifyPasswordField = this.updateVerifyPasswordField.bind(this);
    this.updatefirstNameField = this.updatefirstNameField.bind(this);
    this.updateLastNameField = this.updateLastNameField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateEmailField(event) {
    this.setState({ email: event.target.value });
  }
  updatePasswordField(event) {
    this.setState({ password: event.target.value });
  }
  updateVerifyPasswordField(event) {
    this.setState({ verifyPassword: event.target.value });
  }
  updatefirstNameField(event) {
    this.setState({ firstName: event.target.value });
  }

  updateLastNameField(event) {
    this.setState({ lastName: event.target.value });
  }

  isEmpty = (object) => {
    return !Object.values(object).some((x) => x !== null && x !== "");
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      verifyPassword: this.state.verifyPassword,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    if (this.isEmpty(user)) {
      console.log("form is empty");
      return <Redirect to="/signup" />;
    }
    fetch("/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ flash: res.flash });
        this.props.history.push("/signin");
      })
      .catch((err) => this.setState({ flash: err.flash }));
  };

  render() {
    return (
      <div className="signup">
        <h1>Sign Up!</h1>
        <form onSubmit={this.handleSubmit} className="signup_form">
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
            <TextField
              type="text"
              label="Verify Password"
              name="verifyPassword"
              value={this.state.verifyPassword}
              onChange={this.updateVerifyPasswordField}
            />
          </div>
          <div>
            <TextField
              type="text"
              label="First Name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.updatefirstNameField}
            />
          </div>

          <div>
            <TextField
              type="text"
              label="Last Name"
              name="lastName"
              value={this.state.lastName}
              onChange={this.updateLastNameField}
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
              <Link to="/signin">Sign In!</Link>
            </Button>
          </div>
        </form>
        {/* {this.state.flash ? (
          <SnackbarContent
            anchorOrigin={"bottom, center"}
            message={this.state.flash}
          />
        ) : null} */}
      </div>
    );
  }
}

export default withRouter(SignUp);
