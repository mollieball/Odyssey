import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    this.updateEmailField = this.updateEmailField.bind(this);
  }

  updateEmailField(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.email}</h1>
        <input
          type="email"
          name={this.state.email}
          onChange={this.updateEmailField}
        />
      </React.Fragment>
    );
  }
}

export default SignUp;
