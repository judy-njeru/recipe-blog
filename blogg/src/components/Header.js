import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import '../css/Header.css';

import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

class Header extends Component {

  componentWillMount() {

  const createProfile = bindActionCreators(actions.createProfile, this.props.dispatch);

  const { userProfile, getProfile } = this.props.auth;
  if (!userProfile && this.props.auth.isAuthenticated()) {
    getProfile((err, profile) => {
      createProfile(profile);
    });
  } else{
    createProfile(userProfile);
  }
}

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Recipe Blog- React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }

            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'blog')}
                  >
                    Add Recipe
                  </Button>
                )
            }

            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'profile')}
                  >
                    Profile
                  </Button>
                )
            }


            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return{
    profileData: state.profileData,
  }
}

export default connect(mapStateToProps)(Header);
