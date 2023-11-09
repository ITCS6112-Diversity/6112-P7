import React from 'react';
import './LoginRegister.css';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

class LoginRegister extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      login_name: "",
      login_password: "",
      login_error_message: "",
      register_username: "",
      register_first_name: "",
      register_last_name: "",
      register_location: "",
      register_description: "",
      register_occupation: "",
      register_password1: "",
      register_password2: "",
      register_error_message: "",
      show_login: true
    };
  }

  setLoginName = e => {
    this.setState({login_name: e.target.value});
  };

  setLoginPassword = e => {
    this.setState({login_password: e.target.value});
  };

  setRegisterUsername = e => {
    this.setState({register_username: e.target.value});
  };

  setRegisterFirstName = e => {
    this.setState({register_first_name: e.target.value});
  };

  setRegisterLastName = e => {
    this.setState({register_last_name: e.target.value});
  };

  setRegisterLocation = e => {
    this.setState({register_location: e.target.value});
  };

  setRegisterDescription = e => {
    this.setState({register_description: e.target.value});
  };

  setRegisterOccupation = e => {
    this.setState({register_occupation: e.target.value});
  };

  setRegisterPassword1 = e => {
    this.setState({register_password1: e.target.value});
  };

  setRegisterPassword2 = e => {
    this.setState({register_password2: e.target.value});
  };

  setShowLogin = (showLogin) => {
    this.setState({show_login: showLogin});
  };

  handleLogin = e => {
    e.preventDefault();

    console.log("username", this.state.login_name);
    console.log("password", this.state.login_password);
    
    axios.post("http://localhost:3000/admin/login", {
      login_name: this.state.login_name,
      login_password: this.state.login_password
    }).then((response) => {
      console.log(response);
      const uid = response.data._id;

      this.setState({login_error_message: ""});
      localStorage.setItem("uid", uid); // Keep logged in user's uid in localStorage to persist login on refresh, etc

      this.props.setLogin();
      this.props.history.push("/users/" + uid);
    }).catch(() => {
      this.setState({login_error_message: "Incorrect username or password"});
    });
  };

  handleRegister = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="login-register">
        {this.state.show_login ? (
        <Box component="form" className="login-box" sx={{ boxShadow: 3 }}>
          <Typography component="h1" className="login-header">Sign In</Typography>
          <TextField label="Username" variant="standard" value={this.state.login_name} onChange={this.setLoginName} className="login-login-name"/>
          <TextField label="Password" variant="standard" value={this.state.login_password} onChange={this.setLoginPassword} className="login-password"/>
          <Button type="submit" variant="contained" className="login-button" onClick={this.handleLogin}>Login</Button>
          <Button className="login-register-button" onClick={() => this.setShowLogin(false)}>Don&apos;t have an account? Register here</Button>
          {this.state.login_error_message !== "" && <Typography component="h1" className="login-error">{this.state.login_error_message}</Typography>}
        </Box>
        ) : (
        <Box component="form" className="register-box" sx={{ boxShadow: 3 }}>
          <Typography component="h1" className="register-header">Register</Typography>
          <Grid container className="register-field-container">
            <Grid item xs={6}>
              <TextField label="Username" variant="standard" value={this.state.register_username} onChange={this.setRegisterUsername} className="register-field"/>
              <TextField label="First name" variant="standard" value={this.state.register_first_name} onChange={this.setRegisterFirstName} className="register-field"/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Last name" variant="standard" value={this.state.register_last_name} onChange={this.setRegisterLastName} className="register-field"/>
              <TextField label="Location" variant="standard" value={this.state.register_location} onChange={this.setRegisterLocation} className="register-field"/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Description" variant="standard" value={this.state.register_description} onChange={this.setRegisterDescription} className="register-field"/>
              <TextField label="Occupation" variant="standard" value={this.state.register_occupation} onChange={this.setRegisterOccupation} className="register-field"/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Password" variant="standard" value={this.state.register_password1} onChange={this.setRegisterPassword1} className="register-field"/>
              <TextField label="Verify Password" variant="standard" value={this.state.register_password2} onChange={this.setRegisterPassword2} className="register-field"/>
            </Grid>
          </Grid>
          <Button variant="contained" className="register-login-button" onClick={() => this.setShowLogin(true)}>Go to Login</Button>
          <Button type="submit" variant="contained" className="register-button" onClick={this.handleRegister}>Register Me</Button>
          {this.state.register_error_message !== "" && <Typography component="h1" className="register-error">{this.state.register_error_message}</Typography>}
        </Box>
        )}
      </div>
    );
  }
}

export default LoginRegister;