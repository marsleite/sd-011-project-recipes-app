import { combineReducers } from 'redux';
import emailReducer from './emailReducer';
import menuReducer from './menuReducer';
import recipeDetailsReducer from './recipeDetailsReducer';
import exploreRecipeReducer from './exploreRecipeReducer';
import recipeProgressReducer from './recipeProgressReducer';

const rootReducer = combineReducers({
  menuReducer,
  emailReducer,
  recipeDetailsReducer,
  exploreRecipeReducer,
  recipeProgressReducer,
});

export default rootReducer;
