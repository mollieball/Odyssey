import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      login: false
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

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ login: true });
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
      </div>
    );
  }
}

export default SignIn;
