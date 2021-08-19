import {
  menuRequest,
  handleMealsResponse,
  handleDrinksResponse,
  menuReceiveSuccess,
  menuReceiveFailure,
} from './menuReducerActions';

export const fetchIngredients = (ingredients) => (dispatch) => {
  dispatch(menuRequest());
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    .then((response) => response.json())
    .then(async ({ meals }) => {
      const response = await handleMealsResponse(meals);
      dispatch(menuReceiveSuccess(response));
    })
    .catch(() => dispatch(menuReceiveFailure('404')));
};

export const fetchByName = (byName) => (dispatch) => {
  dispatch(menuRequest());
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${byName}`)
    .then((response) => response.json())
    .then(async ({ meals }) => {
      const response = await handleMealsResponse(meals);
      dispatch(menuReceiveSuccess(response));
    })
    .catch(() => dispatch(menuReceiveFailure('404')));
};

export const fetchByFirstLetter = (firstLetter) => (dispatch) => {
  dispatch(menuRequest());
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    .then((response) => response.json())
    .then(async ({ meals }) => {
      const response = await handleMealsResponse(meals);
      dispatch(menuReceiveSuccess(response));
    })
    .catch(() => dispatch(menuReceiveFailure('404')));
};

export const fetchDrinksIngredient = (drinksIngredient) => (dispatch) => {
  dispatch(menuRequest());
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinksIngredient}`)
    .then((response) => response.json())
    .then(async ({ drinks }) => {
      const response = await handleDrinksResponse(drinks);
      dispatch(menuReceiveSuccess(response));
    })
    .catch(() => dispatch(menuReceiveFailure('404')));
};

export const fetchDrinksByName = (drinksByName) => (dispatch) => {
  dispatch(menuRequest());
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinksByName}`)
    .then((response) => response.json())
    .then(async ({ drinks }) => {
      const response = await handleDrinksResponse(drinks);
      dispatch(menuReceiveSuccess(response));
    })
    .catch(() => dispatch(menuReceiveFailure('404')));
};

export const fetchDrinksByFirstLetter = (drinksByFirst) => (dispatch) => {
  dispatch(menuRequest());
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${drinksByFirst}`)
    .then((response) => response.json())
    .then(async ({ drinks }) => {
      const response = await handleDrinksResponse(drinks);
      dispatch(menuReceiveSuccess(response));
    })
    .catch(() => dispatch(menuReceiveFailure('404')));
};
