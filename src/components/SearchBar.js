import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
// import {
//   fetchMealsIngredient,
//   fetchMealsLetter,
//   fetchMealsName,
// } from '../services/MealApiService';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState({
    searchText: '',
    filterRadio: 'ingredient',
  });// estado dos valores setados pelos inputs

  const location = useLocation();

  const { handleSearch } = useContext(RecipesContext);

  function handleGenericInput({ target: { name, value } }) { // função generica para pegar os valores do input
    setSearchInput({ ...searchInput, [name]: value });
  }

  // async function handleSearch() {
  //   const { searchText, filterRadio } = searchInput;
  //   if (filterRadio === 'ingredient') {
  //     const ingredients = await fetchMealsIngredient(searchText);
  //     return console.log(ingredients);
  //   }
  //   if (filterRadio === 'name') {
  //     const mealsName = await fetchMealsName(searchText);
  //     return console.log(mealsName);
  //   }
  //   if (filterRadio === 'firstLetter') {
  //     if (searchText.length > 1) {
  //       return alert('Sua busca deve conter somente 1 (um) caracter');
  //     }
  //     const fisrtName = await fetchMealsLetter(searchText);
  //     return console.log(fisrtName);
  //   }
  // }

  return (
    <section className="section-container">
      <div className="search-recipe">
        <div className="input-btn">
          <input
            type="text"
            data-testid="search-input"
            name="searchText"
            onChange={ handleGenericInput }
          />
          <button
            type="button"
            data-testid="exec-search-btn"
            disabled={ (searchInput.searchText.length === 0) }
            onClick={ () => handleSearch(searchInput, location.pathname) }
          >
            Ir
          </button>
        </div>
        <div className="search-radio">
          <label htmlFor="search-ingredients">
            <input
              id="search-ingredients"
              type="radio"
              data-testid="ingredient-search-radio"
              name="filterRadio"
              value="ingredient"
              onChange={ handleGenericInput }
            />
            Ingredientes
          </label>
          <label htmlFor="search-name">
            <input
              id="search-name"
              type="radio"
              data-testid="name-search-radio"
              name="filterRadio"
              value="name"
              onChange={ handleGenericInput }
            />
            Nome
          </label>
          <label htmlFor="search-firstLetter">
            <input
              id="search-firstLetter"
              type="radio"
              data-testid="first-letter-search-radio"
              name="filterRadio"
              value="firstLetter"
              onChange={ handleGenericInput }
            />
            Primeira Letra
          </label>
        </div>
      </div>
    </section>
  );
}
