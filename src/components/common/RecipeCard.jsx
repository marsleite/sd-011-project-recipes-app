import React from 'react';
import { string, number } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../../styles/components/recipeCard.css';

const RecipeCard = ({
  index,
  cardTestId,
  cardType,
  recipeId,
  recipeThumb,
  recipeName,
  titleTestId,
}) => {
  const { location: { pathname } } = useHistory();

  const choiceRoute = () => {
    if (cardType === 'comida') {
      return `/comidas/${recipeId}`;
    }
    if (cardType === 'bebida') {
      return `/bebidas/${recipeId}`;
    }
    if (cardType === 'explorar-comida') {
      return { pathname: '/comidas', state: { prevPath: pathname, recipeName } };
    }
    if (cardType === 'explorar-bebida') {
      return { pathname: '/bebidas', state: { prevPath: pathname, recipeName } };
    }
  };

  return (
    <Link
      aria-label="card-menu"
      className="card-menu"
      data-testid={ `${index}${cardTestId}` }
      to={ () => choiceRoute() }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ recipeThumb }
        alt={ `${recipeName} recipe` }
      />
      <h3 data-testid={ `${index}${titleTestId}` }>{ recipeName }</h3>
    </Link>
  );
};

RecipeCard.propTypes = {
  index: number.isRequired,
  cardTestId: string.isRequired,
  cardType: string,
  recipeId: string,
  recipeThumb: string,
  recipeName: string,
  titleTestId: string.isRequired,
};

RecipeCard.defaultProps = {
  cardType: null,
  recipeId: null,
  recipeThumb: undefined,
  recipeName: undefined,
};

export default RecipeCard;
