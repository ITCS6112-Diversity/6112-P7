import React from 'react';
import {
  AppBar, Button, Toolbar, Typography
} from '@mui/material';
import './TopBar.css';
import { withRouter } from "react-router";
import axios from 'axios';

/**
 * Define TopBar, a React component of project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      version: null,
      loggedInUser: null
    };
  }

  componentDidMount() {
    if (this.props.location.pathname.split("/")[2] !== undefined && this.props.loggedIn){
      this.getUserData();
    }
    this.getVersionData();
    this.getLoggedInUser();
  }
  
  componentDidUpdate(prevProps){
    if (this.props.location.pathname !== prevProps.location.pathname && this.props.location.pathname.split("/")[2] !== undefined && this.props.loggedIn){
      this.getUserData();
    }

    // If login status changes to logged in, get the logged in user's data
    if (this.props.loggedIn !== prevProps.loggedIn && this.props.loggedIn){
      this.getLoggedInUser();
    }
  }

  getUserData() {
    axios.get("http://localhost:3000/user/" + this.props.location.pathname.split("/")[2]).then((response) => {
      this.setState({ user: response.data });
    });
  }

  getLoggedInUser() {
    const uid = localStorage.getItem("uid");
    if (uid !== null) {
      axios.get("http://localhost:3000/user/" + uid).then((response) => {
        this.setState({ loggedInUser: response.data });
      });
    }
  }

  getVersionData(){
    axios.get("http://localhost:3000/test/info").then((response) => {
      this.setState({ version: response.data });
    });
  }

  getPath(){
    return this.props.location.pathname.split("/")[1];
  }

  userContext(){
    if (this.getPath() === "photos") {
      return ("Photos of " + this.state.user.first_name + " " + this.state.user.last_name);
    } else if (this.getPath() === "users"){
      return (this.state.user.first_name + " " + this.state.user.last_name + "'s Profile");
    } else {
      return ("");
    }
  }

  handleLogout = e => {
    e.preventDefault();

    axios.post("http://localhost:3000/admin/logout")
    .then(() => {
      localStorage.removeItem("uid");
      this.props.setLogout();
      if (this.props.location.pathname.split("/")[1] !== "login-register"){
        this.props.history.push("/login-register");
      }
    }).catch(() => {
      console.log("Error logging out");
    });

  };

  render() {
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar className="topbar-toolbar">
          <Typography variant="h5" color="inherit">
            ITCS-6112 Team Diversity&apos;s Photo Sharing App &nbsp;
            <i>Version: {this.state.version && (this.state.version.__v)}</i> 
          </Typography>
          <Typography className="topbar-user-context" variant="h5">
            {this.state.user && (this.userContext())}
          </Typography>
          {
            (this.props.loggedIn)
            ? (
            <div>
              {this.state.loggedInUser && (
                <div className="topbar-user-container">
                  <Typography className="topbar-logged-in-user" variant="h5">
                    Hi, {this.state.loggedInUser.first_name}
                  </Typography>
                  <Button variant="contained" className="topbar-logout-button" onClick={this.handleLogout}>
                      Logout
                  </Button>
                </div>
              )}
            </div>
            ) : (
            <div>
              <Typography variant="h5">
                Please log in.
              </Typography>
            </div>
            )
          }

        </Toolbar>
      </AppBar>
    );
  }
}

const TopBarComponent = withRouter(TopBar);

export default TopBarComponent;
