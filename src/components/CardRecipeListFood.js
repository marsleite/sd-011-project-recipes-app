import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { RequestHook } from '../Context/RequestHook';
import CardRecipe from './CardRecipe';
import { searchFoodsAll, searchByIngredient } from '../services/RequestFood';

function CardRecipeList() {
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
      request = await searchByIngredient(ingredient);
    } else {
      request = await searchFoodsAll();
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
      return <Redirect to={ `comidas/${id[0].idMeal}` } />;
    }
  }

  return (
    <div>
      { filtered.length === 1 && changeLocation(filtered) }
      { !(byCategory || byFilter) ? renderItems(initialItens) : renderItems(filtered) }
    </div>
  );
}

export default CardRecipeList;
