import {
  listAllMealsIngredients,
  listAllDrinksIngredients,
  listAllMealsAreas,
} from '../../services/requestMenu';

export const REQUEST_OPTIONS = 'REQUEST_OPTIONS';
export const RECEIVE_OPTIONS_SUCCESS = 'RECEIVE_OPTIONS_SUCCESS';
export const RECEIVE_OPTIONS_FAILURE = 'RECEIVE_OPTIONS_FAILURE';

const handleMealsIngredients = (meals) => {
  const maxMeals = 12;
  const filteredMeals = meals
    .reduce((
      acc,
      { strIngredient },
      index,
    ) => {
      if (index < maxMeals) {
        acc = [
          ...acc,
          {
            strMeal: strIngredient,
            strMealThumb: `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`,
          },
        ];
      }
      return acc;
    }, []);

  return filteredMeals;
};

const handleDrinksIngredients = (drinks) => {
  const maxDrinks = 12;
  const filteredDrinks = drinks.reduce((
    acc,
    { strIngredient1 },
    index,
  ) => {
    if (index < maxDrinks) {
      acc = [
        ...acc,
        {
          strDrink: strIngredient1,
          strDrinkThumb: `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`,
        },
      ];
    }
    return acc;
  }, []);

  return filteredDrinks;
};

const sendRequestOptions = () => ({
  type: REQUEST_OPTIONS,
});

const receiveOptionsSuccess = (data) => ({
  type: RECEIVE_OPTIONS_SUCCESS,
  data,
});

const receiveOptionsFailure = (error) => ({
  type: RECEIVE_OPTIONS_FAILURE,
  error,
});

export const requestMealsOptions = () => (dispatch) => {
  dispatch(sendRequestOptions());
  return (
    listAllMealsIngredients()
      .then(({ meals }) => {
        const response = handleMealsIngredients(meals);
        dispatch(receiveOptionsSuccess(response));
      })
      .catch(() => dispatch(receiveOptionsFailure('400')))
  );
};

export const requestDrinksOptions = () => (dispatch) => {
  dispatch(sendRequestOptions());
  return (
    listAllDrinksIngredients()
      .then(({ drinks }) => {
        const response = handleDrinksIngredients(drinks);
        dispatch(receiveOptionsSuccess(response));
      })
      .catch(() => dispatch(receiveOptionsFailure('400')))
  );
};

export const REQUEST_MEALS_AREAS = 'REQUEST_MEALS_AREAS';
export const RECEIVE_MEALS_AREAS_SUCCESS = 'RECEIVE_MEALS_AREAS_SUCCESS';
export const RECEIVE_MEALS_AREAS_FAILURE = 'RECEIVE_MEALS_AREAS_FAILURE';

const sendRequestMealsAreas = () => ({
  type: REQUEST_MEALS_AREAS,
});

const receiveMealsAreasSuccess = (areas) => ({
  type: RECEIVE_MEALS_AREAS_SUCCESS,
  areas,
});

const receiveMealsAreasFailure = (error) => ({
  type: RECEIVE_MEALS_AREAS_FAILURE,
  error,
});

export const requestMealsAreas = () => (dispatch) => {
  dispatch(sendRequestMealsAreas());
  return (
    listAllMealsAreas()
      .then(({ meals }) => {
        const response = meals.map(({ strArea }) => strArea);
        dispatch(receiveMealsAreasSuccess(response));
      })
      .catch(() => dispatch(receiveMealsAreasFailure('400')))
  );
};
