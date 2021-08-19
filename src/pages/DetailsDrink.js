import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { searchDrinkById } from '../services/RequestDrinks';
import { searchFoodsAll } from '../services/RequestFood';
import { RequestHook } from '../Context/RequestHook';
import Clipboard from '../components/Clipboard';
import Favorite from '../images/blackHeartIcon.svg';

function DetailsDrink(props) {
  const { match: { params: { id } } } = props;
  const { initialItens, setInitialItens } = RequestHook();
  const [initialItemApi, setInitialItemApi] = useState([]);
  const limitItensRecomend = 6;

  useEffect(() => {
    async function getDetailsById() {
      const itemsDrink = await searchDrinkById(id);
      setInitialItemApi(itemsDrink);
    }
    async function getAllCategories() {
      const items = await searchFoodsAll();
      setInitialItens(items);
    }
    getDetailsById();
    getAllCategories();
  }, [id]);

  function renderCard(object, number) {
    return (
      <Link to={ `/comidas/${object.idMeal}` }>
        <button
          type="button"
          key={ number }
          data-testid={ `${number}-recomendation-card` }
          className="recomendation-button"
          hidden={ number > 1 }
        >
          <p data-testid={ `${number}-recomendation-title` }>{ object.strMeal }</p>
          <img
            src={ object.strMealThumb }
            alt={ `${number}-card-name` }
            width="100px"
          />
        </button>
      </Link>
    );
  }

  function renderIngrediente(drink) {
    const array = [];
    const limitItens = 15;

    for (let numero = 1; numero <= limitItens; numero += 1) {
      if (drink[`strIngredient${numero}`] !== null
        && drink[`strIngredient${numero}`] !== '') {
        array.push(
          <li
            data-testid={ `${numero - 1}-ingredient-name-and-measure` }
          >
            { `${drink[`strIngredient${numero}`]} ` }
            { (drink[`strMeasure${numero}`] !== null
              && drink[`strMeasure${numero}`] !== '')
              ? <span>{ `${drink[`strMeasure${numero}`]}` }</span>
              : '' }
          </li>,
        );
      }
    }
    return array;
  }

  function recStorage() {
    const { strDrink, strDrinkThumb, strAlcoholic } = initialItemApi[0];
    const doneRecipetwo = {
      id,
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
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
      : initialItemApi.map((drink, index) => (
        <div key={ index } className="details-page">
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            width="200px"
          />
          <h2 data-testid="recipe-title">{ drink.strDrink }</h2>
          <h4 data-testid="recipe-category">
            { drink.strAlcoholic }
          </h4>
          <div>
            <h3>Ingredientes</h3>
            { renderIngrediente(drink) }
          </div>
          <h3>Instruções</h3>
          <p data-testid="instructions">{ drink.strInstructions }</p>
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
                .map((drinkRecomend, indexRec) => renderCard(drinkRecomend, indexRec))
            }
          </div>
          <Link to={ `/bebidas/${drink.idDrink}/in-progress` }>
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

DetailsDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DetailsDrink;
