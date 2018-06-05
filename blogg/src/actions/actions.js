import * as actionTypes from "../actionTypes/actionTypes";

export const createProfile = (profileData)=>{
  const url = "http://localhost:3001/api/adduser";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append('Accept','application/json');
  fetch(url, {
    method: "POST",
    body: JSON.stringify(profileData),
    headers: headers
  }).then(()=>console.log('updated!!!'))
  .catch( err => {
    console.log("The error is ", err)
  });

  return {
    type: actionTypes.CREATE_PROFILE,
    profileData: profileData
  }
}


export const fetchRecipeData = (getRecipe)=>{
  return{
    type: actionTypes.FETCH_RECIPE_DATA,
    getRecipe: getRecipe
  }
}
