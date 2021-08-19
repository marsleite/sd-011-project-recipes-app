import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Clipboard from '../components/Clipboard';
import { searchById } from '../services/RequestFood';
import '../styles/drink.css';

function RecipeProgressFood(props) {
  const { match: { params: { id } } } = props;
  const [initialItemApi, setInitialItemApi] = useState([]);
  const [progressRecipe] = useState([]);

  useEffect(() => {
    async function getDetailsById() {
      const itemsFood = await searchById(id);
      setInitialItemApi(itemsFood);
    }

    getDetailsById();
  }, [id]);

  function storageCheck() {
    let verifyRecipeId;
    const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storageFavorite !== null) {
      verifyRecipeId = Object.values(storageFavorite).find(({ id: x }) => x === id);
    }
    return verifyRecipeId;
  }

  function isCheckedFood(e) {
    if (e.currentTarget.className !== 'checked') {
      e.currentTarget.className = 'checked';
    } else if (e.currentTarget.className === 'checked') {
      e.currentTarget.className = '';
    }
  }
  function inProgressRecipesLocalStorage(e) {
    const progress = localStorage.getItem('inProgressRecipes');
    const inProgress = JSON.parse(progress);
    const objectCocktailsAndMeals = {
      cocktails: {
        id: [],
      },
      meals: {
        [id]: [e.target.id],
      },
    };

    if (inProgress === null) {
      return localStorage
        .setItem('inProgressRecipes', JSON.stringify(objectCocktailsAndMeals));
    }
    return localStorage
      .setItem('inProgressRecipes', JSON.stringify(progressRecipe));
  }

  function renderIngrediente(food) {
    const array = [];
    const limitItens = 15;

    for (let numero = 1; numero <= limitItens; numero += 1) {
      if (food[`strIngredient${numero}`] !== null
        && food[`strIngredient${numero}`] !== '') {
        array.push(
          <div>
            <label
              htmlFor={ numero }
              data-testid={ `${numero}-ingredient-step` }
              onChange={ (e) => isCheckedFood(e) }
            >
              <input
                onChange={ (e) => inProgressRecipesLocalStorage(e) }
                type="checkbox"
                id={ `${food[`strIngredient${numero}`]} ` }
              />
              { `${food[`strIngredient${numero}`]} ` }

              { (food[`strMeasure${numero}`] !== null
                && food[`strMeasure${numero}`] !== '')
                ? <span>{ `${food[`strMeasure${numero}`]}` }</span>
                : '' }
            </label>
          </div>,
        );
      }
    }
    return array;
  }

  function recStorage() {
    const { strMeal, strCategory, strArea, strMealThumb, strTags } = initialItemApi[0];

    const tag = strTags ? strTags.split(',')[0] : ' ';
    const tagTwo = strTags !== null ? strTags.split(',')[1] : '';

    const date = new Date();

    const doneRecipetwo = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: date,
      tags: [tag, tagTwo],
    };

    storageCheck();

    const done = localStorage.getItem('doneRecipes');
    console.log(strTags);
    const doneRecipes = JSON.parse(done);
    if (doneRecipes === null) {
      const doneRecipetwoString = JSON.stringify([doneRecipetwo]);
      return localStorage.setItem('doneRecipes', doneRecipetwoString);
    }
    const allInfo = [...doneRecipes, doneRecipetwo];
    const stringNewArrayOfObjects = JSON.stringify(allInfo);
    return localStorage.setItem('doneRecipes', stringNewArrayOfObjects);
  }

  return (
    initialItemApi && initialItemApi.map((meal, index) => (
      <div key={ index } className="inProgressRecipes">
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          width="150px"
        />
        <h2 data-testid="recipe-title">{ meal.strMeal }</h2>
        <h4 data-testid="recipe-category">
          { meal.strCategory }
        </h4>
        <div className="recipe-category">
          <h3>Ingredientes</h3>
          { renderIngrediente(meal) }
        </div>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ meal.strInstructions }</p>
        <Clipboard />
        <button
          type="button"
          data-testid="favorite-btn"
          className="receitas-btn"
        >
          Favorite
        </button>
        <Link to="/receitas-feitas">
          <button
            className="receitas-btn"
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => recStorage() }
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    )));
}

RecipeProgressFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default RecipeProgressFood;
