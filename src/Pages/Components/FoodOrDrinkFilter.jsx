import React from 'react';
import PropTypes from 'prop-types';

export default function FoodOrDrinkFilter({ setFilter }) {
  return (
    <div>
      <button
        className="button col-3 mb-1 mx-1"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
        type="button"
      >
        All
      </button>
      <button
        className="button col-4 mb-1 mx-1"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('foods') }
        type="button"
      >
        Food
      </button>
      <button
        className="button col-4 mb-1 mx-1"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drinks') }
        type="button"
      >
        Drinks
      </button>
    </div>
  );
}

FoodOrDrinkFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
