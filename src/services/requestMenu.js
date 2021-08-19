export const searchMealByName = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
);

export const searchDrinkByName = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
);

export const requestAllMealCategories = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
);

export const requestAllDrinkCategories = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
);

export const filterMealByCategory = (meal) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`)
    .then((response) => response.json())
);

export const filterDrinkByCategory = (drink) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`)
    .then((response) => response.json())
);

export const mealsRecipeDetails = (idMeal) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((response) => response.json())
);

export const drinksRecipeDetails = (idDrink) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
    .then((response) => response.json())
);

export const listAllMealsIngredients = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
);

export const listAllDrinksIngredients = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
);

export const listAllMealsAreas = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
);

export const listMealsByArea = (area) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((response) => response.json())
);
