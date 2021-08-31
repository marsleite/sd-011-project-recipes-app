export async function fetchDrinksIngredient(ingredient) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.ingredients;
}

export async function fetchDrinksName(name) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.drinks;
}

export async function fetchDrinksLetter(letter) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data.drinks;
}

export async function fetchDrinkCategory(category) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.drinks;
}

export async function fetchDrinkId(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks;
}

export async function fetchDrinkRecommanded() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
}

export const getRandmomDrink = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((res) => res.json());
  return response.drinks[0];
};

export async function fetchDrinksByIngredient(param) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`);
  const data = await response.json();
  return data.drinks;
}

export const fetchIngredientsList = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((res) => res.json());
  return response.drinks;
};
