import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import {
  fetchMealsIngredient,
  fetchMealsName,
  fetchMealsLetter,
  fetchMealsId,
  fetchMealsRecommended,
} from '../services/MealApiService';

import {
  fetchDrinkId,
  fetchDrinkRecommanded,
  fetchDrinksIngredient,
  fetchDrinksLetter,
  fetchDrinksName,
} from '../services/DrinksApiServices';

export default function RecipesProvider({ children }) {
  const [loginState, setLogin] = useState({
    email: '',
    password: '',
    isDisabled: true,
  });

  const [redirect, setRedirect] = useState(false);
  const [recipesDb, setRecipesDb] = useState([]);
  const [mealId, setMealId] = useState({});
  const [drinkId, setDrinkId] = useState({});
  const [drinkRecommend, setDrinkRecommend] = useState([]);
  const [mealsRecommend, setMealsRecommend] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);

  function visibleAlert(data) { // implementação do requisito 18
    if (data === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      setRecipesDb(data);
    }
  }

  async function handleSearchMeals(searchText, filterRadio) { // função que faz requisição para as refeições com info do searchBar!
    let data = [];
    if (filterRadio === 'ingredient') {
      data = await fetchMealsIngredient(searchText);
      visibleAlert(data);
    }
    if (filterRadio === 'name') {
      data = await fetchMealsName(searchText);
      visibleAlert(data);
    }
    if (filterRadio === 'firstLetter') {
      if (searchText.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      data = await fetchMealsLetter(searchText);
      visibleAlert(data);
    }
    if (data !== null && data.length === 1) {
      setRedirect(true);
    }
  }

  async function handleSearchDrinks(searchText, filterRadio) { // função que faz requisição para os drinks com info do serachbar
    let data = [];
    if (filterRadio === 'ingredient') {
      data = await fetchDrinksIngredient(searchText);
      visibleAlert(data);
    }
    if (filterRadio === 'name') {
      data = await fetchDrinksName(searchText);
      visibleAlert(data);
    }
    if (filterRadio === 'firstLetter') {
      if (searchText.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      data = await fetchDrinksLetter(searchText);
      visibleAlert(data);
    }
    if (data !== null && data.length === 1) {
      setRedirect(true);
    }
  }

  function handleSearch(inputs, pathname) { // inputs e pathname vem como parametro da função que é disparada na searchBar
    const { searchText, filterRadio } = inputs;
    if (pathname.includes('comidas')) { // buscando a api de comidas se tiver na pagina de comidas
      handleSearchMeals(searchText, filterRadio);
    }
    if (pathname.includes('bebidas')) { // buscando a api de bebidas se tiver na pagina de bebidas
      handleSearchDrinks(searchText, filterRadio);
    }
  }

  async function getMealId(id) {
    const response = await fetchMealsId(id);
    setMealId(response[0]);
  }

  async function getDrinkId(id) {
    const response = await fetchDrinkId(id);
    setDrinkId(response[0]);
  }

  async function getDrinkRecommanded() {
    const response = await fetchDrinkRecommanded();
    setDrinkRecommend(response);
  }

  async function getMealRecommend() {
    const response = await fetchMealsRecommended();
    setMealsRecommend(response);
  }

  useEffect(() => {
    getDrinkRecommanded();
    getMealRecommend();
  }, []);

  const context = {
    loginState,
    setLogin,
    handleSearch,
    recipesDb,
    redirect,
    setRecipesDb,
    mealId,
    getMealId,
    drinkId,
    getDrinkId,
    drinkRecommend,
    mealsRecommend,
    allIngredientsChecked,
    setAllIngredientsChecked,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
