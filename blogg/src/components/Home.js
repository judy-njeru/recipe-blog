import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

import '../css/Home.css';
import squashImage from '../img/Squash-soup.jpg';
import jalapenosImage from '../img/spi_jalapenos.jpg';
import pumpkinImage from '../img/pump_muff.jpg';
import saladImage from '../img/salad.jpg';
import noodlesImage from '../img/noodles.jpg';
import minestroneImage from '../img/minestrone.jpg';


class Home extends Component {
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

  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <div>
              <div className="profile-areaa">

                <Panel header="Popular Recipes">
                  <div className="row">
                      <div className="w3-col s6 top_row_margin">
                        <div className="card">
                          <img src={squashImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>Golden Soup</b></h5>

                          </div>
                        </div>
                      </div>

                      <div className="w3-col s6 top_row_margin">
                        <div className="card">
                          <img src={jalapenosImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>spinach queso with crispy jalapeños</b></h5>

                          </div>
                        </div>
                      </div>

                      <div className="w3-col s6 top_row_margin">
                        <div className="card">
                          <img src={pumpkinImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>Pumpkin Muffins</b></h5>

                          </div>
                        </div>
                      </div>

                      <div className="w3-col s6 bottom_row_margin">
                        <div className="card">
                          <img src={minestroneImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>instant pot minestrone soup</b></h5>
                          </div>
                        </div>
                      </div>

                      <div className="w3-col s6 bottom_row_margin">
                        <div className="card">
                          <img src={saladImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>cheater’s power salad</b></h5>
                          </div>
                        </div>
                      </div>

                      <div className="w3-col s6 bottom_row_margin">
                        <div className="card">
                          <img src={noodlesImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>chili garlic instant pot noodles</b></h5>
                          </div>
                        </div>
                      </div>
                  </div>

                </Panel>

                </div>
              </div>

            )
        }
        {
          !isAuthenticated() && (
            <div>
              <div className="profile-areaa">

                <Panel header="Popular Recipes" className="heading">
                  <div className="row">
                      <div className="w3-col s6 top_row_margin">
                        <div className="card">
                          <img src={squashImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>Golden Soup</b></h5>

                          </div>
                        </div>
                      </div>

                      <div className="w3-col s6 top_row_margin">
                        <div className="card">
                          <img src={jalapenosImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>spinach queso with crispy jalapeños</b></h5>

                          </div>
                        </div>
                      </div>

                      <div className="w3-col s6 top_row_margin">
                        <div className="card">
                          <img src={pumpkinImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>Pumpkin Muffins</b></h5>

                          </div>
                        </div>
                      </div>

                      <div className="w3-col s6 bottom_row_margin">
                        <div className="card">
                          <img src={minestroneImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>instant pot minestrone soup</b></h5>
                          </div>
                        </div>
                      </div>

                      <div className="w3-col s6 bottom_row_margin">
                        <div className="card">
                          <img src={saladImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>cheater’s power salad</b></h5>
                          </div>
                        </div>
                      </div>

                      <div className="w3-col s6 bottom_row_margin">
                        <div className="card">
                          <img src={noodlesImage} className="card-img" alt="Avatar" ></img>
                          <div className="cont">
                            <h5><b>chili garlic instant pot noodles</b></h5>
                          </div>
                        </div>
                      </div>
                  </div>

                </Panel>

                </div>
              </div>
            )
        }
      </div>
    );
  }
}


const mapStateToProps = state => {
  return{
    profileData: state.profileData,
  }
}

export default connect(mapStateToProps)(Home);
