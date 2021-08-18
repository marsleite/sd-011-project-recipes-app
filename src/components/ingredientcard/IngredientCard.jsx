import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function IngredientCard({ ingredient, mealOrCocktail, index, path }) {
  console.log(ingredient);
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <Link
        to={ {
          pathname: path,
          filter: 'ingredient',
          item: ingredient,
        } }
      >
        <img
          src={
            `https://www.the${mealOrCocktail}db.com/images/ingredients/${ingredient}-Small.png`
          }
          alt={ ingredient }
          data-testid={ `${index}-card-img` }
        />
        <h2 data-testid={ `${index}-card-name` }>{ingredient}</h2>
      </Link>
    </div>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.object,
  mealOrCocktail: PropTypes.string,
  index: PropTypes.number,
  path: PropTypes.string,
}.isRequired;
