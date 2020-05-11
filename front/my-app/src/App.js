import React from "react";
import SignIn from "./containers/SignIn";
import Profile from "./containers/Profile";
import SignUp from "./containers/SignUp";
import PopUp from "./containers/PopUp";
import { Grid, Paper } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Authentication from "./hoc/requireAuth";
import NotAuthentication from "./hoc/requireNotAuth";

function App() {
  return (
    <div className="App">
      <Grid container alignItems="center" style={{ height: "100%" }}>
        <Grid item xs={12}>
          <Paper elevation={4} style={{ margin: 32, backgroundColor: "white" }}>
            <Grid container alignItems="center" justify="center">
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  maxWidth: "100%",
                }}
              >
                <img
                  src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png"
                  alt="homer"
                />
                <Switch>
                  <Route exact path="/" component={NotAuthentication(SignIn)} />
                  <Route path="/signin" component={NotAuthentication(SignIn)} />
                  <Route path="/signup" component={NotAuthentication(SignUp)} />
                  <Route path="/profile" component={Authentication(Profile)} />
                </Switch>
                <PopUp />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
