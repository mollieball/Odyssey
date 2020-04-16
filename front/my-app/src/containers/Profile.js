import React from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: "",
        name: "",
        lastname: "",
      },
      signin: false,
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    if (this.props.token) {
      fetch("/profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          else throw new Error(res.statusText);
        })
        .then((res) => {
          console.log(res);
          this.setState({ profile: res });
        })
        .catch((err) => console.error(err));
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ signin: true });
  };

  render() {
    if (this.state.signin === true) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="profile">
        <h1>Welcome {this.state.profile.name}</h1>
        <List>
          <ListItem>
            <ListItemText primary={this.state.profile.email} />
          </ListItem>
          <ListItem>
            <ListItemText primary={this.state.profile.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary={this.state.profile.lastname} />
          </ListItem>
        </List>
        <Button
          variant="outlined"
          color="secondary"
          value="submit"
          onClick={this.handleSubmit}
        >
          Sign Out!
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps)(Profile);
