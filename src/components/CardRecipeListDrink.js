import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { RequestHook } from '../Context/RequestHook';
import CardRecipe from './CardRecipe';

import { searchDrinksAll, searchDrinkByIngredient } from '../services/RequestDrinks';

function CardRecipeListDrink() {
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
      request = await searchDrinkByIngredient(ingredient);
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

export default CardRecipeListDrink;
