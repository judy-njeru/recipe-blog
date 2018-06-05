import * as actionTypes from "../actionTypes/actionTypes";

const initState = {
  profileData: {},
  getRecipe: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PROFILE:
      return {...state, profileData: action.profileData};
    case actionTypes.FETCH_RECIPE_DATA:
      return {...state, getRecipe: action.getRecipe};
    default:
      return state;
  }
}
