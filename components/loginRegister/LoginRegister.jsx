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

  setUsername(username){
    console.log(username);
    this.setState({username: username});
  }

  setPassword(password){
    this.setState({password: password});
  }

  handleSubmit(e) {
    
  }

  render() {
    return (
      <div className="login-register">
        <Box component="form" className="login-box" sx={{ boxShadow: 3 }} onSubmit={this.handleSubmit}>
          <Typography component="h1" className="login-header">Sign In</Typography>
          <TextField label="Username" variant="standard" onChange={e => this.setUsername(e.target.value)}/>
          <TextField label="Password" variant="standard" onChange={e => this.setPassword(e.target.value)}/>
          <Button type="submit" variant="contained" className="login-button">Login</Button>
        </Box>
      </div>
    );
  }
}

export default LoginRegister;