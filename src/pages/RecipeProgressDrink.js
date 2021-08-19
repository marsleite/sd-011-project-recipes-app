import React, { useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';

import { Link } from 'react-router-dom';
import { searchId } from '../services/RequestDrinks';
import '../styles/drink.css';
// import Clipboard from '../components/Clipboard';

function RecipeProgressDrink(props) {
  const { match: { params: { id } } } = props;
  const [initialItemApi, setInitialItemApi] = useState([]);
  const [changeInput, setChangeInput] = useState(true);

  useEffect(() => {
    async function getDetailsById() {
      const itemsDrink = await searchId(id);
      setInitialItemApi(itemsDrink);
    }

    getDetailsById();
  }, [id]);

  function storageCheck() {
    let verifyRecipeId;
    const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storageFavorite !== null) {
      verifyRecipeId = object.values(storageFavorite).find(({ id: x }) => x === id);
    }
    return verifyRecipeId;
  }

  function isChecked(numero, e) {
    if (e.currentTarget.className !== 'checked') {
      e.currentTarget.className = 'checked';
    } else if (e.currentTarget.className === 'checked') {
      e.currentTarget.className = '';
    }

    setChangeInput(() => !changeInput);
    if (changeInput === true) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(numero));
    } else {
      localStorage.removeItem('inProgressRecipes');
    }
    console.log(numero);
  }


  function renderIngrediente(drink) {
    const array = [];
    const limitItens = 15;
    for (let numero = 1; numero <= limitItens; numero += 1) {
      if (drink[`strIngredient${numero}`] !== null
      && drink[`strIngredient${numero}`] !== '') {
        array.push(
          <div>
            <label
              htmlFor={ numero }
              data-testid={ `${numero}-ingredient-step` }
              onChange={ (e) => isChecked(`${numero - 1}-ingredient-step`, e) }
            >
              <input
                type="checkbox"
                data-testid={ `${numero}-ingredient-step` }
              />
              { `${drink[`strIngredient${numero}`]} ` }
              { (drink[`strMeasure${numero}`] !== null
              && drink[`strMeasure${numero}`] !== '')
                ? <span>{ `${drink[`strMeasure${numero}`]}` }</span>
                : '' }
            </label>
          </div>,
        );
      }
    }
    return array;
  }

  function recStorage() {
    const { strDrink, strDrinkThumb, strAlcoholic, strTags } = initialItemApi[0];
    const date = new Date();

    const doneRecipetwo = {
      id,
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: date,
      tags: strTags,
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
    initialItemApi && initialItemApi.map((drink, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          width="50px"
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
        <button
          type="button"
          data-testid="share-btn"
        >
          Share
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorite
        </button>
        <Link to="/receitas-feitas">

          <button
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

RecipeProgressDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default RecipeProgressDrink;
