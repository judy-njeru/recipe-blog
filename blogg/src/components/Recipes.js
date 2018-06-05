import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import '../css/Recipes.css';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

class Recipes extends Component {

  componentDidMount(){
  const fetchRecipeData = bindActionCreators(actions.fetchRecipeData, this.props.dispatch);
    return fetch('http://localhost:3001/api/blogs')
    .then((response)=>response.json())
    .then((response)=>{
      fetchRecipeData(response);
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  render() {
        const { isAuthenticated } = this.props.auth;

    const recipes = this.props.getRecipe;

    return (
      <div className="container">
                        <Panel header="Your Recipes" className="p_head">
        {
          recipes.map((recipe)=>{
            if(this.props.profileData.sub==recipe.userId) {
              return (

                <div>
                  <div className="profile-areaa">

                      <div className="row">
                          <div className="rec-col top_row_margin">
                              <div className="contd">
                              <img src={"../../" + recipe.imageUrl} className="upl-img" alt="Avatar" ></img>
                                <h3><b>{recipe.title}</b></h3>
                                <h4>{recipe.mainText}</h4>

                              </div>
                          </div>
                      </div>


                    </div>
                  </div>
              )
            }
          })
        }
</Panel>
      </div>
    );

  }
}

const mapStateToProps = state => {
  return{
    getRecipe: state.getRecipe,
    profileData: state.profileData,
  }
}

export default connect(mapStateToProps)(Recipes);
