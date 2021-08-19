import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/components/startRecipeBtn.css';
import useRecipeStatus from '../../hooks/useRecipeStatus';

const StartRecipeBtn = ({ routeInfo: { id, url } }) => {
  const { recipeProgress, showBtn } = useRecipeStatus(id, url);

  const [currentRecipeId] = useState(id);

  const choiceRoute = () => {
    if (url.includes('comidas')) {
      return `/comidas/${currentRecipeId}/in-progress`;
    }
    if (url.includes('bebidas')) {
      return `/bebidas/${currentRecipeId}/in-progress`;
    }
  };

  return (
    (showBtn)
      ? (
        <Link
          className="start-recipe-btn "
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
          to={ choiceRoute() }
          type="button"
        >
          { recipeProgress }
        </Link>
      )
      : null
  );
};

StartRecipeBtn.propTypes = {
  routeInfo: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default StartRecipeBtn;
