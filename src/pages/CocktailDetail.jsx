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
      const { id } = params;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const request = await fetch(url);
      const data = await request.json();
      setRecipe(data.drinks[0]);
    }());
    (async function fetchCategory() {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${recipe.strCategory}`;
      const request = await fetch(url);
      const data = await request.json();
      setRecommended(data.drinks);
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
    strDrink,
    strDrinkThumb,
    strYoutube,
    strInstructions,
    strCategory,
  } = recipe;

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
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
            title={ element.strDrink }
            imagePath={ element.strDrinkThumb }
            id={ element.idDrink }
            index={ index }
          />
        ))
      }
      <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
    </div>
  );
}
