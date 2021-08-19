import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { RequestHook } from '../Context/RequestHook';
import CardRecipe from './CardRecipe';
import { searchFoodsAll, searchByIngredient } from '../services/RequestFood';

function CardRecipeListFood() {
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
      setInitialItens(request);
    } else {
      request = await searchFoodsAll();
      setInitialItens(request);
    }
  }

  useEffect(() => {
    loadInitialItens();
  }, []);

  // function changeLocation(id) {
  //   if (id.length === 1) {
  //     return <Redirect to={ `comidas/${id[0].idMeal}` } />;
  //   }
  // }

  function renderItems(array) {
    const num = '52968';
    if (!array) return;
    if (array.length === 1 && array[0].idMeal !== num) {
      return <Redirect to={ `/comidas/${array[0].idMeal}` } />;
    }
    return (
      array.slice(0, MAX_RESULT).map((item, index) => (
        <CardRecipe key={ index } item={ item } index={ index } />))
    );
  }

  return (
    <div>
      { !(byCategory || byFilter) ? renderItems(initialItens) : renderItems(filtered) }
    </div>
  );
}

export default CardRecipeListFood;
