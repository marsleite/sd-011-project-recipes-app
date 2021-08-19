import {
  SET_PROGRESS_DONE,
  CLEAR_PROGRESS,
} from '../actions/recipeProgressActions';

const INITIAL_STATE = ({
  done: false,
});

const recipeProgressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PROGRESS_DONE:
    return ({
      ...state,
      done: true,
    });
  case CLEAR_PROGRESS:
    return ({
      ...state,
      done: false,
    });
  default:
    return state;
  }
};

export default recipeProgressReducer;
