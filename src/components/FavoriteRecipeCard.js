import React from 'react';
import Proptypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import SharedButton from './SharedButton';

function FavoriteRecipeCard(props) {
  const { key, nameDataTestId, categoryDataTestId, imageDataTestId,
    recipeDoneDateDataTestId,
    image, name, category, recipeDoneDate, type, area, alcoholicOrNot } = props;

  function renderMealCard() {
    return (
      <>
        <img
          src={ image }
          alt="food done"
          data-testid={ imageDataTestId }
          style={ { width: 25 } }
        />
        <h4 data-testid={ categoryDataTestId }>{ category }</h4>
        <h2 data-testid={ nameDataTestId }>{ name }</h2>
        <h4>{ area }</h4>
        <h4 data-testid={ recipeDoneDateDataTestId }>{recipeDoneDate}</h4>
      </>
    );
  }

  function renderDrinkCard() {
    return (
      <>
        <img
          src={ image }
          alt="food done"
          data-testid={ imageDataTestId }
          style={ { width: 25 } }
        />
        <h4 data-testid={ categoryDataTestId }>{ category }</h4>
        <h2 data-testid={ nameDataTestId }>{ name }</h2>
        <h4>{ alcoholicOrNot }</h4>
        <h4 data-testid={ recipeDoneDateDataTestId }>{recipeDoneDate}</h4>
      </>
    );
  }

  return (
    <div key={ key }>
      { type === 'comida' ? renderMealCard() : renderDrinkCard() }
      <FavoriteButton />
      <SharedButton />
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  key: Proptypes.string.isRequired,
  nameDataTestId: Proptypes.string.isRequired,
  categoryDataTestId: Proptypes.string.isRequired,
  imageDataTestId: Proptypes.string.isRequired,
  recipeDoneDateDataTestId: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  category: Proptypes.string.isRequired,
  recipeDoneDate: Proptypes.func.isRequired,
  type: Proptypes.string.isRequired,
  area: Proptypes.string.isRequired,
  alcoholicOrNot: Proptypes.string.isRequired,
};

export default FavoriteRecipeCard;
