import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch
} from 'react-router-dom';
import {
  Grid, Paper
} from '@mui/material';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';
import LoginRegister from './components/loginRegister/LoginRegister';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.state = {
      loggedIn: false
    };
  }

  setLogin = () => {
    this.setState({loggedIn: true});
    console.log("loggedIn: ", this.state.loggedIn);
  };

  setLogout = () => {
    this.setState({loggedIn: false});
    console.log("loggedIn: ", this.state.loggedIn);
  };

  render() {
    return (
      <HashRouter>
      <div>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TopBar loggedIn={this.state.loggedIn} setLogin={this.setLogin} setLogout={this.setLogout}/>
        </Grid>
        <div className="main-topbar-buffer"/>
        <Grid item sm={3}>
          <Paper className="main-grid-item">
            <UserList />
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className="main-grid-item">
            <Switch>
            <Route exact path="/"/>
            <Route path="/login-register"
              render={ props => <LoginRegister {...props} setLogin={this.setLogin}/> }
            />
            <Route path="/users/:userId"
              render={ props => <UserDetail {...props} /> }
            /> 
            <Route path="/photos/:userId"
              render ={ props => <UserPhotos {...props} /> }
            />
            <Route path="/users" component={UserList}  />
            </Switch>
          </Paper>
        </Grid>
      </Grid>
      </div>
      </HashRouter>
    );
  }
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
