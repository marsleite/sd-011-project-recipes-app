import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import filterDrinkMeasuresAndIngredients from
  '../helpers/filterDrinkMeasuresAndIngredients';

function drinksIngredients({ drinkDetails }) {
  const measuresAndIngredients = filterDrinkMeasuresAndIngredients(drinkDetails);
  return (
    <ul>
      {
        drinkDetails
          ? measuresAndIngredients.map((element, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {
                element
              }
            </li>
          ))
          : <h1>Carregando</h1>
      }

    </ul>
  );
}

drinksIngredients.propTypes = ({
  drinkDetails: PropTypes.arrayOf,
}).isRequired;

const mapStateToProps = (state) => ({
  drinkDetails: state.recipeDetailsReducer.drink,
});

export default connect(mapStateToProps)(drinksIngredients);
