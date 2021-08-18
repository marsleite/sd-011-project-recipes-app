import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { RequestHook } from '../Context/RequestHook';
import CardRecipe from './CardRecipe';
import { searchFoodsAll, searchByIngredient } from '../services/RequestFood';
import { searchDrinksAll, searchDrinkByIngredient } from '../services/RequestDrinks';

function CardRecipeList({ origin }) {
  const {
    byCategory,
    byFilter,
    ingredient,
    filtered,
    initialItens,
    setInitialItens } = RequestHook();

  const MAX_RESULT = 12;

  async function loadInitialItens() {
    let request;
    if (ingredient !== '') {
      if (origin === 'Food') {
        request = await searchByIngredient(ingredient);
      } else {
        request = await searchDrinkByIngredient(ingredient);
      }
    } else if (origin === 'Food') {
      request = await searchFoodsAll();
    } else {
      request = await searchDrinksAll();
    }
    setInitialItens(request);
  }

  useEffect(() => {
    loadInitialItens();
  }, []);

  function renderItems(array) {
    return (
      array.slice(0, MAX_RESULT).map((item, index) => (
        <CardRecipe key={ index } item={ item } index={ index } />))
    );
  }

  function changeLocation(id) {
    if (id.length === 1) {
      if (origin === 'Food') {
        return <Redirect to={ `comidas/${id[0].idMeal}` } />;
      }
      return <Redirect to={ `bebidas/${id[0].idDrink}` } />;
    }
  }

  return (
    <div>
      { filtered.length === 1 && changeLocation(filtered) }
      { !(byCategory || byFilter) ? renderItems(initialItens) : renderItems(filtered) }
    </div>
  );
}

CardRecipeList.propTypes = {
  origin: PropTypes.string.isRequired,
};

export default CardRecipeList;
