import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import './RecipeCard.css';

export default function RecipeCard({ recipeTitle, imagePath, index, path }) {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      className="cardContainer"
      onClick={ () => history.push(path) }
    >
      <img src={ imagePath } alt={ recipeTitle } data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>{recipeTitle}</h2>
    </button>
  );
}

RecipeCard.propTypes = {
  recipeTitle: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
};
