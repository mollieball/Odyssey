import React from "react";

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
      .then(
        res => this.setState({ flash: res.flash }),
        err => this.setState({ flash: err.flash })
      );
  };

  render() {
    return (
      <React.Fragment>
        <h1>{JSON.stringify(this.state)}</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.updateEmailField}
          />
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.updatePasswordField}
          />
          <input
            type="text"
            name="verifyPassword"
            value={this.state.verifyPassword}
            onChange={this.updateVerifyPasswordField}
          />
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.updateNameField}
          />
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.updateLastNameField}
          />

          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    );
  }
}

export default SignUp;
