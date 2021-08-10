import {
  GET_RANDOM_RECIPE,
  GET_RANDOM_RECIPE_SUCCESS,
  GET_RANDOM_RECIPE_ERROR,
} from '../actions';

const INITIAL_STATE = {
  randomRecipe: [],
  loading: false,
  error: null,
};

const recipeRandomReducer = (state = INITIAL_STATE, { type, id }) => {
  switch (type) {
  case GET_RANDOM_RECIPE:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case GET_RANDOM_RECIPE_SUCCESS:
    return {
      ...state,
      loading: false,
      randomRecipe: id,
    };
  case GET_RANDOM_RECIPE_ERROR:
    return {
      ...state,
      loading: false,
      error: id,
    };
  default:
    return state;
  }
};

export default recipeRandomReducer;
