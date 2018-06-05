import React, { Component } from 'react';
import {  Button, Panel } from 'react-bootstrap';
import './css/blog.css';

import { connect } from 'react-redux';

class Blog extends Component {

  saveBlog(){
    console.log(document.getElementById("upload_file").files);
    const auth = this.props.auth;
    let profile = {};
    if(auth.isAuthenticated()){
      profile = auth.userProfile;
      if(!profile){
        auth.getProfile((err,profill)=>{
          profile=profill;
        })
      }

      const title = document.getElementById("title");
      const ingredients = document.getElementById("ingredients");
      const text = document.getElementById("text");
      const headers = new Headers();
      const body = {
        title:title.value,
        ingredients:ingredients.value,
        text:text.value,
        userId:profile.sub
      }
      headers.append("Content-Type", "application/json");
      headers.append('Accept','application/json');
      fetch("http://localhost:3001/api/blogs", {
        method:"POST",
        body: JSON.stringify(body),
        headers:headers
      })
    }
  }
  render() {
    const auth = this.props.auth;
    let profile = {};
    if(auth.isAuthenticated()){
      profile = auth.userProfile;
      if(!profile){
        auth.getProfile((err,profill)=>{
          profile=profill;
        })
      }
    }

    return (
      <div className="container">

        <Panel header="Add Your Recipe" className="heading">
          <div className="Render">

            <form action="http://localhost:3001/api/upload" method="post" encType="multipart/form-data">
              <div className="form-group">
                <input type="text" className="form-control form_width" id="title" placeholder="Enter the recipe title" name="title"/>
                <input type="text" className="form-control form_width" id="ingredients" placeholder="Enter the ingredients" name="ingredients"/>

                <textarea name="mainText" className="form-control text_area" rows="5" id="text" placeholder="Enter your recipe"></textarea>

                <input type="hidden" name="userId" value={this.props.profileData.sub}/>

                <label className="myLabel">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                  <input type="file"  name="image" id="input-file"required/>
                  <span>Upload Image</span>
                </label>

                <Button bsStyle="primary" className="btn-add-recipe add-rec" type="submit">ADD RECIPE</Button>

              </div>

              <hr />
            </form>

          </div>
        </Panel>

      </div>
    );
  }
}



const mapStateToProps = state => {
  return{
    profileData: state.profileData,
  }
}

export default connect(mapStateToProps)(Blog);
