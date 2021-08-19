import {
  searchMealByName,
  searchDrinkByName,
  requestAllMealCategories,
  requestAllDrinkCategories,
  filterMealByCategory,
  filterDrinkByCategory,
  listMealsByArea,
} from '../../services/requestMenu';

export const REQUEST_MENU = 'REQUEST_MENU';
export const RECEIVE_MENU_SUCCESS = 'RECEIVE_MENU_SUCCESS';
export const RECEIVE_MENU_FAILURE = 'RECEIVE_MENU_FAILURE';

export const menuRequest = () => ({
  type: REQUEST_MENU,
});

export const menuReceiveSuccess = (menu) => ({
  type: RECEIVE_MENU_SUCCESS,
  menu,
});

export const menuReceiveFailure = () => ({
  type: RECEIVE_MENU_FAILURE,
  error: '404',
});

export const handleMealsResponse = (meals) => {
  const maxMeals = 12;
  const filteredMeals = meals
    .reduce((
      acc,
      { idMeal, strMeal, strMealThumb },
      index,
    ) => {
      if (index < maxMeals) {
        acc = [
          ...acc,
          {
            idMeal,
            strMeal,
            strMealThumb,
          },
        ];
      }
      return acc;
    }, []);

  return filteredMeals;
};

export const handleDrinksResponse = (drinks) => {
  const maxDrinks = 12;
  const filteredDrinks = drinks
    .reduce((
      acc,
      { idDrink, strDrink, strDrinkThumb },
      index,
    ) => {
      if (index < maxDrinks) {
        acc = [
          ...acc,
          {
            idDrink,
            strDrink,
            strDrinkThumb,
          },
        ];
      }
      return acc;
    }, []);

  return filteredDrinks;
};

export const requestMealsMenu = () => (dispatch) => {
  dispatch(menuRequest());
  return (
    searchMealByName()
      .then(async ({ meals }) => {
        const response = await handleMealsResponse(meals);
        dispatch(menuReceiveSuccess(response));
      })
      .catch(() => dispatch(menuReceiveFailure()))
  );
};

export const requestDrinkMenu = () => (dispatch) => {
  dispatch(menuRequest());
  return (
    searchDrinkByName()
      .then(async ({ drinks }) => {
        const response = await handleDrinksResponse(drinks);
        dispatch(menuReceiveSuccess(response));
      })
      .catch(() => dispatch(menuReceiveFailure()))
  );
};

export const REQUEST_MENU_FILTERS = 'REQUEST_MENU_FILTERS';
export const RECEIVE_MENU_FILTERS_SUCCESS = 'RECEIVE_MENU_FILTERS_SUCCESS';
export const RECEIVE_MENU_FILTERS_FAILURE = 'RECEIVE_MENU_FILTERS_FAILURE';

const requestFilterOptions = () => ({
  type: REQUEST_MENU_FILTERS,
});

const requestFilterOptionsSuccess = (options) => ({
  type: RECEIVE_MENU_FILTERS_SUCCESS,
  options,
});

const requestFilterOptionsFailure = () => ({
  type: RECEIVE_MENU_FILTERS_FAILURE,
  error: '404',
});

const handleFilterMenuList = (menuList) => {
  const maxFilterOptions = 5;
  const filteredOptions = menuList
    .reduce((acc, { strCategory }, index) => {
      if (index < maxFilterOptions) {
        acc = [...acc, strCategory];
      }
      return acc;
    }, []);

  return filteredOptions;
};

export const requestMealsFilters = () => (dispatch) => {
  dispatch(requestFilterOptions());
  return (
    requestAllMealCategories()
      .then(async ({ meals }) => {
        const response = await handleFilterMenuList(meals);
        dispatch(requestFilterOptionsSuccess(response));
      })
      .catch(() => dispatch(requestFilterOptionsFailure()))
  );
};

export const requestDrinksFilters = () => (dispatch) => {
  dispatch(requestFilterOptions());
  return (
    requestAllDrinkCategories()
      .then(async ({ drinks }) => {
        const filteredOptions = await handleFilterMenuList(drinks);
        dispatch(requestFilterOptionsSuccess(filteredOptions));
      })
      .catch(() => dispatch(requestFilterOptionsFailure()))
  );
};

export const requestMealsByFilter = (meal) => (dispatch) => {
  dispatch(menuRequest());
  return (
    filterMealByCategory(meal)
      .then(async ({ meals }) => {
        const response = await handleMealsResponse(meals);
        dispatch(menuReceiveSuccess(response));
      })
      .catch(() => dispatch(menuReceiveFailure()))
  );
};

export const requestDrinksByFilter = (drink) => (dispatch) => {
  dispatch(menuRequest());
  return (
    filterDrinkByCategory(drink)
      .then(async ({ drinks }) => {
        const response = await handleDrinksResponse(drinks);
        dispatch(menuReceiveSuccess(response));
      })
      .catch(() => dispatch(menuReceiveFailure()))
  );
};

export const requestMealsByArea = (area) => (dispatch) => {
  dispatch(menuRequest());
  return (
    listMealsByArea(area)
      .then(async ({ meals }) => {
        const response = await handleMealsResponse(meals);
        dispatch(menuReceiveSuccess(response));
      })
  );
};
