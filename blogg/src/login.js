import React, { Component } from 'react';


class Login extends Component {

  login(){
    handleAuthentication();
  }

  render() {
    return (
      { !auth.isAuthenticated()?(
        <button onClick={this.login}>Login</button>
        ):<div>You are logged on</div>
      }
  }
}

export default Login;
