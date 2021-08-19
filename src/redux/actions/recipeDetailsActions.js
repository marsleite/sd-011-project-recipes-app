import { mealsRecipeDetails, drinksRecipeDetails } from '../../services/requestMenu';

export const REQUEST_DETAILS = 'REQUEST_DETAILS';
export const RECEIVE_DETAILS_FAILURE = 'RECEIVE_DETAILS_FAILURE';
export const RECEIVE_MEAL_DETAILS_SUCCESS = 'RECEIVE_MEAL_DETAILS_SUCCESS';
export const RECEIVE_DRINK_DETAILS_SUCCESS = 'RECEIVE_DRINK_DETAILS_SUCCESS';

const sendRequestDetails = () => ({
  type: REQUEST_DETAILS,
});

const receiveDetailsFailure = () => ({
  type: RECEIVE_DETAILS_FAILURE,
  error: '404',
});

const receiveMealDetailsSuccess = (details) => ({
  type: RECEIVE_MEAL_DETAILS_SUCCESS,
  details,
});

const receiveDrinkDetailsSuccess = (details) => ({
  type: RECEIVE_DRINK_DETAILS_SUCCESS,
  details,
});

export const requestMealDetails = (idMeal) => (dispatch) => {
  dispatch(sendRequestDetails());
  return (
    mealsRecipeDetails(idMeal)
      .then(({ meals }) => dispatch(receiveMealDetailsSuccess(meals)))
      .catch(() => dispatch(receiveDetailsFailure()))
  );
};

export const requestDrinkDetails = (idDrink) => (dispatch) => {
  dispatch(sendRequestDetails());
  return (
    drinksRecipeDetails(idDrink)
      .then(({ drinks }) => dispatch(receiveDrinkDetailsSuccess(drinks)))
      .catch(() => dispatch(receiveDetailsFailure()))
  );
};
