import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchDrinkById } from '../services/RequestDrinks';
import Clipboard from '../components/Clipboard';
import '../styles/drink.css';

function RecipeProgressDrink(props) {
  const { match: { params: { id } } } = props;
  const [initialItemApi, setInitialItemApi] = useState([]);
  const [changeInput, setChangeInput] = useState(false);

  useEffect(() => {
    async function getDetailsById() {
      const itemsDrink = await searchDrinkById(id);
      setInitialItemApi(itemsDrink);
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
      <div key={ index } className="inProgressRecipes">
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          width="150px"
        />
        <h2 data-testid="recipe-title">{ drink.strDrink }</h2>
        <h4 data-testid="recipe-category">
          { drink.strAlcoholic }
        </h4>
        <div className="recipe-category">
          <h3>Ingredientes</h3>
          { renderIngrediente(drink) }
        </div>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ drink.strInstructions }</p>
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

RecipeProgressDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default RecipeProgressDrink;
