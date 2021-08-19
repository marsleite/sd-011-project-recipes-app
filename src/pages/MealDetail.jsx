import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import RecipeVideo from '../components/recipevideo/RecipeVideo';
import RecommendedRecipes from '../components/recommendedrecipes/RecommendedRecipes';
import ShareButton from '../components/sharebutton/ShareButton';
import FavoriteButton from '../components/favoritebutton/FavoriteButton';

export default function MealDetail() {
  const params = useParams();

  const [recipe, setRecipe] = useState({});
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    (async function fetchApiById() {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      const request = await fetch(url);
      const data = await request.json();
      setRecipe(data.meals[0]);
    }());
    (async function fetchCategory() {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipe.strCategory}`;
      const request = await fetch(url);
      const data = await request.json();
      setRecommended(data.meals);
    }());
  }, []);

  const arrayOfIngredientKeys = Object.keys(recipe).filter((element) => (
    element.includes('strIngredient')
  ));
  const newIngredientsArray = arrayOfIngredientKeys.map((ingredient) => (
    {
      [ingredient]: recipe[ingredient],
    }
  ));
  const arrayOfMeasureKeys = Object.keys(recipe).filter((element) => (
    element.includes('strMeasure')
  ));
  const newMeasureArray = arrayOfMeasureKeys.map((ingredient) => (
    {
      [ingredient]: recipe[ingredient],
    }
  ));

  const {
    strMeal,
    strMealThumb,
    strYoutube,
    strInstructions,
    strCategory,
  } = recipe;

  return (
    <div>
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <ShareButton />
      <FavoriteButton />
      <p data-testid="recipe-category">{strCategory}</p>
      {
        newIngredientsArray
        && newIngredientsArray.map((ingredient, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${Object.values(ingredient)} ${Object.values(newMeasureArray[index])}`}
          </p>
        ))
      }
      <p data-testid="instructions">{strInstructions}</p>
      <RecipeVideo strYoutube={ strYoutube } />
      {
        recommended
        && recommended.map((element, index) => (
          <RecommendedRecipes
            key={ index }
            title={ element.strMeal }
            imagePath={ element.strMealThumb }
            id={ element.idMeal }
            index={ index }
          />
        ))
      }
      <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
    </div>
  );
}
