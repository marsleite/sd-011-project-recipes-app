import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

export default function RecommendedRecipes({ title, id, imagePath, index }) {
  const history = useHistory();
  return (
    <button
      type="button"
      onClick={ history.push(`/comidas/${id}`) }
      data-testid={ `${index}-recomendation-card` }
    >
      <img src={ imagePath } alt={ title } />
      <h3>{title}</h3>
    </button>
  );
}

RecommendedRecipes.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  imagePath: PropTypes.string,
}.isRequired;
