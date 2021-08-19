import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipe] = useState([]);
  const [message, setmessage] = useState(null);
  const [indexOfmessage, setIndexOfmessage] = useState(null);

  React.useEffect(() => {
    const storage = localStorage.getItem('favoriteRecipes');

    if (storage) {
      setRecipes(JSON.parse(storage));
      setFilteredRecipe(JSON.parse(storage));
    }
  }, []);

  function handleClickFilters({ target: { value } }) {
    if (value === 'comida') {
      setFilteredRecipe(recipes.filter((recipe) => recipe.type === 'comida'));
    } else if (value === 'bebida') {
      setFilteredRecipe(recipes.filter((recipe) => recipe.type === 'bebida'));
    } else setFilteredRecipe(recipes);
  }

  function handleClick(index, type, id) {
    const url = window.location.href.split('/receitas-favoritas')[0];
    navigator.clipboard.writeText(`${url}/${type}s/${id}`);
    setmessage('Link copiado!');
    setIndexOfmessage(index);
    const time = 3000;
    setTimeout(() => {
      setmessage(null);
    }, time);
  }

  function removeFavoriteRecipe(id) {
    const favoritedRecipes = JSON.parse(localStorage.favoriteRecipes)
      .filter((recipe) => recipe.id !== id);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoritedRecipes),
    );
    setFilteredRecipe(favoritedRecipes);
  }

  return (
    <main>
      <Header page="Receitas Favoritas" />
      <button
        type="button"
        value="all"
        data-testid="filter-by-all-btn"
        onClick={ handleClickFilters }
      >
        All
      </button>
      <button
        type="button"
        value="comida"
        data-testid="filter-by-food-btn"
        onClick={ handleClickFilters }
      >
        Food
      </button>
      <button
        type="button"
        value="bebida"
        data-testid="filter-by-drink-btn"
        onClick={ handleClickFilters }
      >
        Drinks
      </button>
      <ul>
        {filteredRecipes.map((recipe, index) => {
          const {
            image,
            type,
            id,
            category,
            name,
            area,
            alcoholicOrNot,
          } = recipe;

          return (
            <li key={ id }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt=""
                  data-testid={ `${index}-horizontal-image` }
                  width="120px"
                />
                <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
              </Link>
              {area ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${area} - ${category}` }
                </p>
              ) : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { alcoholicOrNot }
                </p>
              )}
              <button type="button" onClick={ () => handleClick(index, type, id) }>
                <img
                  src={ shareIcon }
                  alt=""
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              {index === indexOfmessage && <p>{message}</p>}
              <button
                type="button"
                onClick={ () => removeFavoriteRecipe(id) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Icon to favorite foods"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default FavoriteRecipes;
