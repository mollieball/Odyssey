import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import "./SignUp.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      verifyPassword: "",
      name: "",
      lastName: "",
      flash: ""
    };

    this.updateEmailField = this.updateEmailField.bind(this);
    this.updatePasswordField = this.updatePasswordField.bind(this);
    this.updateVerifyPasswordField = this.updateVerifyPasswordField.bind(this);
    this.updateNameField = this.updateNameField.bind(this);
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
  updateNameField(event) {
    this.setState({ name: event.target.value });
  }

  updateLastNameField(event) {
    this.setState({ lastName: event.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch("/auth/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => this.setState({ flash: res.flash }))
      .catch(err => this.setState({ flash: err.flash }));
    this.setState({ open: false });
    console.log("form submitted");
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
              label="Name"
              name="name"
              value={this.state.name}
              onChange={this.updateNameField}
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
            {/* <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={this.state.open}
              onClose={this.handleClose}
              ContentProps={{ "aria-describedby": "message-id" }}
              message={<span id="message-id">{this.state.flash}</span>}
            /> */}
          </div>
        </form>
        {this.state.flash ? (
          <SnackbarContent
            anchorOrigin={"bottom, center"}
            message={this.state.flash}
          />
        ) : null}
      </div>
    );
  }
}

export default SignUp;
