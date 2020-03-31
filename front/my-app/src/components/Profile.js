import React from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: "homer.simpson@wildcodeschool.fr",
        name: "Homer",
        lastname: "Simpson"
      }
    };
  }

  render() {
    return (
      <div className="profile">
        <h1>Welcome {this.state.profile.name}</h1>
        <List>
          <ListItem>
            <ListItemText
              primary="Email"
              secondary={this.state.profile.email}
            />
            <ListItemText
              primary="First Name"
              secondary={this.state.profile.name}
            />
            <ListItemText
              primary="Last Name"
              secondary={this.state.profile.lastname}
            />
          </ListItem>
        </List>
        <Button variant="outlined" color="secondary">
          <Link to="/">Sign Out!</Link>
        </Button>
      </div>
    );
  }
}

export default Profile;
