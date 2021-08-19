import {
  REQUEST_MENU,
  RECEIVE_MENU_SUCCESS,
  RECEIVE_MENU_FAILURE,
  REQUEST_MENU_FILTERS,
  RECEIVE_MENU_FILTERS_SUCCESS,
  RECEIVE_MENU_FILTERS_FAILURE,
} from '../actions/menuReducerActions';

const INITIAL_STATE = {
  menu: [],
  mealId: '',
  drinkId: '',
  error: null,
  isLoading: false,
  filters: {
    options: [],
    isLoading: false,
    error: null,
  },
};

const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_MENU:
    return {
      ...state,
      isLoading: true,
    };
  case RECEIVE_MENU_SUCCESS:
    return {
      ...state,
      menu: action.menu,
      mealId: action.menu[0].idMeal,
      drinkId: action.menu[0].idDrink,
      isLoading: false,
      error: null,
    };
  case RECEIVE_MENU_FAILURE:
    return {
      ...state,
      menu: [],
      error: action.error,
      isLoading: false,
    };
  case REQUEST_MENU_FILTERS:
    return {
      ...state,
      filters: {
        ...state.filters,
        isLoading: true,
      },
    };
  case RECEIVE_MENU_FILTERS_SUCCESS:
    return {
      ...state,
      filters: {
        ...state.filters,
        options: action.options,
        isLoading: false,
      },
    };
  case RECEIVE_MENU_FILTERS_FAILURE:
    return {
      ...state,
      filters: {
        ...state.filters,
        error: action.error,
      },
    };
  default:
    return state;
  }
};

export default menuReducer;
