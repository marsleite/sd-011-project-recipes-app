import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import GlobalContext from '../context';
import '../styles/SearchBarHeader.css';

function SearchBarHeader(props) {
  const [option, setOption] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { getDataFromFoods, getDataFromDrinks } = useContext(GlobalContext);

  const handleOption = ({ target }) => {
    const { value } = target;
    setOption(value);
  };

  const handleSearchInput = ({ target }) => {
    const { value } = target;
    setSearchInput(value);
  };

  const requestApiFoodDrink = () => {
    const endPointIngredientMeals = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
    const endPointNameMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const endPointFirstLetterMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

    const endPointIngredientDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    const endPointNameDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const endPointFirstLetterDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

    const firstLetter = 'primeira-letra';

    const { history: { location: { pathname } } } = props;

    if (pathname === '/comidas') {
      if (option === 'ingrediente') {
        getDataFromFoods(endPointIngredientMeals, searchInput);
      } else if (option === 'nome') {
        getDataFromFoods(endPointNameMeals, searchInput);
      } else if (option === firstLetter && searchInput.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        getDataFromFoods(endPointFirstLetterMeals, searchInput);
      }
    } else if (pathname === '/bebidas') {
      if (option === 'ingrediente') {
        getDataFromDrinks(endPointIngredientDrinks, searchInput);
      } else if (option === 'nome') {
        getDataFromDrinks(endPointNameDrinks, searchInput);
      } else if (option === firstLetter && searchInput.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        getDataFromDrinks(endPointFirstLetterDrinks, searchInput);
      }
    }

    setOption('');
    setSearchInput('');
  };

  const requestApi = () => {
    const { setSearchBarVisible } = props;
    requestApiFoodDrink();
    setSearchBarVisible(false);
  };

  const closeModal = () => {
    const { setSearchBarVisible } = props;
    setSearchBarVisible(false);
  };

  function renderForm() {
    return (
      <div className="search-modal">
        <form className="search-form">
          <span
            onClick={ closeModal }
            onKeyDown={ () => null }
            role="button"
            tabIndex="-1"
            className="close-modal"
          >
            X
          </span>
          <h2>Busca Avançada</h2>
          <label htmlFor="search-input">
            <input
              id="search-input"
              type="text"
              value={ searchInput }
              onChange={ handleSearchInput }
              placeholder="Buscar Receita"
              data-testid="search-input"
            />
          </label>

          <div className="radio-container">
            <label htmlFor="ingredient">
              <input
                id="ingredient"
                type="radio"
                value="ingrediente"
                checked={ option === 'ingrediente' }
                onChange={ handleOption }
                data-testid="ingredient-search-radio"
              />
              Ingrediente
            </label>

            <label htmlFor="name">
              <input
                id="name"
                type="radio"
                value="nome"
                checked={ option === 'nome' }
                onChange={ handleOption }
                data-testid="name-search-radio"
              />
              Nome
            </label>

            <label htmlFor="first-letter">
              <input
                id="first-letter"
                type="radio"
                value="primeira-letra"
                checked={ option === 'primeira-letra' }
                onChange={ handleOption }
                data-testid="first-letter-search-radio"
              />
              Primeira letra
            </label>
          </div>

          <button
            type="button"
            onClick={ requestApi }
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </form>
      </div>
    );
  }

  return (
    renderForm()
  );
}

export default withRouter(SearchBarHeader);
