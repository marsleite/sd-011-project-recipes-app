export async function fetchMealsIngredient(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchMealsName(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchMealsLetter(letter) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchMealsCategory(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((res) => res.json());
  console.log(response);
  return response.meals;
}

export const getRandmomMeal = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json());
  return response.meals[0];
};

export async function fetchMealsId(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchMealsRecommended() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals;
}

export const getIngredients = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((res) => res.json());
  return response.meals;
};

export const fetchMealCountries = async () => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then((res) => res.json());
  return data.meals;
};
