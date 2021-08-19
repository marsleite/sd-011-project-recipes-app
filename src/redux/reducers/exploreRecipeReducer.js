import {
  REQUEST_OPTIONS,
  RECEIVE_OPTIONS_SUCCESS,
  RECEIVE_OPTIONS_FAILURE,
  REQUEST_MEALS_AREAS,
  RECEIVE_MEALS_AREAS_SUCCESS,
  RECEIVE_MEALS_AREAS_FAILURE,
} from '../actions/exploreRecipeActions';

const INITIAL_STATE = {
  recipeByArea: {
    areas: [],
    isLoading: false,
    error: null,
  },
  options: [],
  isLoading: false,
  error: null,
};

const exploreRecipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_OPTIONS:
    return {
      ...state,
      isLoading: true,
    };
  case RECEIVE_OPTIONS_SUCCESS:
    return {
      ...state,
      options: action.data,
      isLoading: false,
    };
  case RECEIVE_OPTIONS_FAILURE:
    return {
      ...state,
      error: '404',
    };
  case REQUEST_MEALS_AREAS:
    return {
      ...state,
      recipeByArea: {
        ...state.recipeByArea,
        isLoading: true,
      },
    };
  case RECEIVE_MEALS_AREAS_SUCCESS:
    return {
      ...state,
      recipeByArea: {
        ...state.recipeByArea,
        areas: action.areas,
        isLoading: false,
      },
    };
  case RECEIVE_MEALS_AREAS_FAILURE:
    return {
      ...state,
      recipeByArea: {
        ...state.recipeByArea,
        isLoading: false,
        error: action.error,
      },
    };
  default:
    return state;
  }
};

export default exploreRecipeReducer;
