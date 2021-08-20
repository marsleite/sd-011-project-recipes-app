import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import RecipeVideo from '../components/recipevideo/RecipeVideo';
import ShareButton from '../components/sharebutton/ShareButton';
import FavoriteButton from '../components/favoritebutton/FavoriteButton';
import
DrinkRecommendedRecipes from '../components/recommendedrecipes/DrinkRecommendedRecipes';

import './styles/MealDetail.css';

export default function MealDetail() {
  const params = useParams();
  const { id } = params;

  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    (async function fetchApiById() {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const request = await fetch(url);
      const data = await request.json();
      setRecipe(data.meals[0]);
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
    idMeal,
    strMeal,
    strArea,
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
      <FavoriteButton
        id={ idMeal }
        type="meal"
        area={ strArea }
        category={ strCategory }
        alcoholicOrNot=""
        name={ strMeal }
        image={ strMealThumb }
      />
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
      <DrinkRecommendedRecipes />
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="startRecipeButton"
      >
        Iniciar receita
      </button>
    </div>
  );
}
