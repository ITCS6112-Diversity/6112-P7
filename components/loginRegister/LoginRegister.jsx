import React from 'react';
import './LoginRegister.css';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

class LoginRegister extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      login_name: "",
      password: "",
      error_message: ""
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  setLoginName = e => {
    this.setState({login_name: e.target.value});
  };

  setPassword = e => {
    this.setState({password: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("login_name: " + this.state.login_name + "\nPassword: " + this.state.password);
    
    axios.post("http://localhost:3000/admin/login", {
      login_name: this.state.login_name,
      password: this.state.password
    }).then((response) => {
      console.log(response);
      this.setState({error_message: ""});
      this.props.onLogin(response.data);
    }).catch(() => {
      this.setState({error_message: "Incorrect username or password"});
    });
  };

  render() {
    return (
      <div className="login-register">
        <Box component="form" className="login-box" sx={{ boxShadow: 3 }}>
          <Typography component="h1" className="login-header">Sign In</Typography>
          <TextField label="Username" variant="standard" value={this.state.login_name} onChange={this.setLoginName} className="login-login-name"/>
          <TextField label="Password" variant="standard" value={this.state.password} onChange={this.setPassword} className="login-password"/>
          <Button type="submit" variant="contained" className="login-button" onClick={this.handleSubmit}>Login</Button>
          {this.state.error_message !== "" && <Typography component="h1" className="login-error">{this.state.error_message}</Typography>}
        </Box>
      </div>
    );
  }
}

export default LoginRegister;