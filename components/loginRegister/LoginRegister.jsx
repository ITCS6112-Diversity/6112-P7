import React from 'react';
import './LoginRegister.css';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class LoginRegister extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  setUsername = e => {
    this.setState({username: e.target.value});
  };

  setPassword = e => {
    this.setState({password: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Username: " + this.state.username + "\nPassword: " + this.state.password);
    // TODO: Send login request to server
  };

  render() {
    return (
      <div className="login-register">
        <Box component="form" className="login-box" sx={{ boxShadow: 3 }}>
          <Typography component="h1" className="login-header">Sign In</Typography>
          <TextField label="Username" variant="standard" value={this.state.username} onChange={this.setUsername}/>
          <TextField label="Password" variant="standard" value={this.state.password} onChange={this.setPassword}/>
          <Button type="submit" variant="contained" className="login-button" onClick={this.handleSubmit}>Login</Button>
        </Box>
      </div>
    );
  }
}

export default LoginRegister;