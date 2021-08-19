import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { searchById } from '../services/RequestFood';
import { searchDrinksAll } from '../services/RequestDrinks';
import { RequestHook } from '../Context/RequestHook';
import Clipboard from '../components/Clipboard';
import Favorite from '../images/blackHeartIcon.svg';

function DetailsFood(props) {
  const { match: { params: { id } } } = props;
  const { initialItens, setInitialItens } = RequestHook();
  const [initialItemApi, setInitialItemApi] = useState([]);
  const limitItensRecomend = 6;

  useEffect(() => {
    async function getDetailsById() {
      const itemsFood = await searchById(id);
      setInitialItemApi(itemsFood);
    }
    async function getAllCategories() {
      const items = await searchDrinksAll();
      setInitialItens(items);
    }
    getDetailsById();
    getAllCategories();
  }, [id]);

  function renderIngredient(food) {
    const array = [];
    const limitItens = 15;
    for (let numero = 1; numero <= limitItens; numero += 1) {
      if (food[`strIngredient${numero}`] !== null
        && food[`strIngredient${numero}`] !== '') {
        array.push(
          <li
            data-testid={ `${numero - 1}-ingredient-name-and-measure` }
          >
            { `${food[`strIngredient${numero}`]} ` }
            { (food[`strMeasure${numero}`] !== null
              && food[`strMeasure${numero}`] !== '')
              ? <span>{ `${food[`strMeasure${numero}`]}` }</span>
              : '' }
          </li>,
        );
      }
    }
    return array;
  }

  function renderCard(object, number) {
    return (
      <Link to={ `/comidas/${object.idDrink}` }>
        <button
          type="button"
          key={ number }
          data-testid={ `${number}-recomendation-card` }
          className="recomendation-button"
          hidden={ number > 1 }
        >
          <p data-testid={ `${number}-recomendation-title` }>{ object.strDrink }</p>
          <img
            src={ object.strDrinkThumb }
            alt={ `${number}-card-name` }
            width="100px"
          />
        </button>
      </Link>
    );
  }

  function recStorage() {
    const { strMeal, strCategory, strArea, strMealThumb } = initialItemApi[0];
    const doneRecipetwo = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };

    const done = localStorage.getItem('favoriteRecipes');
    const doneRecipes = JSON.parse(done);
    if (doneRecipes === null) {
      const doneRecipetwoString = JSON.stringify([doneRecipetwo]);
      return localStorage.setItem('favoriteRecipes', doneRecipetwoString);
    }
    const allInfo = [...doneRecipes, doneRecipetwo];
    const stringNewArrayOfObjects = JSON.stringify(allInfo);
    return localStorage.setItem('favoriteRecipes', stringNewArrayOfObjects);
  }

  return (
    (!initialItemApi)
      ? (<p>Loading...</p>)
      : initialItemApi.map((meal, index) => (
        <div
          key={ index }
          className="details-page"
        >
          <img
            data-testid="recipe-photo"
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            width="200px"
          />
          <h2 data-testid="recipe-title">{ meal.strMeal }</h2>
          <h4 data-testid="recipe-category">
            { meal.strCategory }
          </h4>
          <div>
            <h3>Ingredientes</h3>
            { renderIngredient(meal) }
          </div>
          <h3>Instruções</h3>
          <p data-testid="instructions">{ meal.strInstructions }</p>
          <ReactPlayer
            controls
            data-testid="video"
            url={ meal.strYoutube }
            width="150"
            height="150"
          />

          <Clipboard />

          <button
            className="buttons"
            type="button"
            data-testid="favorite-btn"
            onClick={ () => recStorage() }
          >
            <img src={ Favorite } alt="Favorite icon" width="15px" />
          </button>
          <div className="recomendation-card">
            {
              initialItens && initialItens
                .slice(0, limitItensRecomend)
                .map((foodRecomend, indexRec) => renderCard(foodRecomend, indexRec))
            }
          </div>
          <Link to={ `/comidas/${meal.idMeal}/in-progress` }>
            <button
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              type="button"
            >
              Iniciar Receita
            </button>
          </Link>
        </div>
      ))
  );
}

DetailsFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DetailsFood;
