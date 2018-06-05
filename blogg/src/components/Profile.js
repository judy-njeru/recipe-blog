import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import '../css/Profile.css';
import { connect } from 'react-redux';
import Recipes from './Recipes';

class Profile extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  render() {
    const profile = this.props.profileData;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <Button bsStyle="success" className="btn-margin" onClick={this.goTo.bind(this, 'recipes')}>
              View Your Recipes
            </Button>
          </Panel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    profileData: state.profileData,
    getRecipe: state.getRecipe
  }
}


export default connect(mapStateToProps)(Profile);
