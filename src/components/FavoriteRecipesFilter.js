import React from 'react';
import PropTypes from 'prop-types';

export default function FavoriteRecipesButtons({ onChange }) {
  return (
    <div className="filters-container">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => onChange(undefined) }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => onChange('comida') }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => onChange('bebida') }
      >
        Drinks
      </button>
    </div>
  );
}

FavoriteRecipesButtons.propTypes = {
  onChange: PropTypes.func.isRequired,
};
