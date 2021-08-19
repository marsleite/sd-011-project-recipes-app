import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchDrinkById } from '../services/RequestDrinks';
import '../styles/drink.css';

function RecipeProgressDrink(props) {
  const { match: { params: { id } } } = props;
  const [initialItemApi, setInitialItemApi] = useState([]);
  const [changeInput, setChangeInput] = useState(false);
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    async function getDetailsById() {
      const itemsDrink = await searchDrinkById(id);
      setInitialItemApi(itemsDrink);
    }
    getDetailsById();
  }, []);

  function handleClick({ value }) {
    if (!changeInput) {
      setClicked(value);
      localStorage.setItem('inProgressRecipes', JSON.stringify(value));
    } else {
      setClicked(0);
      localStorage.removeItem('inProgressRecipes');
    }
    setChangeInput((state) => !state);
  }

  function renderIngredient(drink) {
    const array = [];
    const limitItens = 15;
    for (let index = 1; index <= limitItens; index += 1) {
      if (drink[`strIngredient${index}`]) {
        const className = clicked === `${index}` ? 'checked' : '';
        const ingredient = drink[`strIngredient${index}`];
        const measure = drink[`strMeasure${index}`];
        array.push(
          <div key={ index }>
            <label
              htmlFor={ `${index}-ingredient` }
              data-testid={ `${index}-ingredient-step` }
              className={ className }
            >
              <input
                type="checkbox"
                id={ `${index}-ingredient` }
                value={ index }
                onChange={ (e) => handleClick(e.target) }
              />
              {`${ingredient} ${measure}`}
            </label>
          </div>,
        );
      }
    }
    return array;
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
          { renderIngredient(drink) }
        </div>
        <h3>Instruções</h3>
        <p data-testid="instructions">{ drink.strInstructions }</p>
        <Clipboard />
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
