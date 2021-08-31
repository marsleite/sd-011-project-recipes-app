import React, { useState, useEffect } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavouriteReciples() {
  const pageTitle = {
    pageName: 'Receitas Favoritas',
    setIcon: false,
  };
  const favoriteFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favorited, setFavorited] = useState(favoriteFromStorage);
  const [copied, setCopied] = useState(false);

  function removeFavorite(event, id) {
    event.preventDefault();
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFavorites = favoriteStorage
      .filter((favorite) => favorite.id !== id);
    setFavorited(newFavorites);
  }

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorited));
  }, [favorited]);

  return (
    <div>
      <Header value={ pageTitle } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavorited(favoriteFromStorage) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFavorited(favorited
            .filter((recipes) => recipes.type === 'comida')) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFavorited(favorited
            .filter((recipes) => recipes.type === 'bebida')) }
        >
          Drinks
        </button>
      </div>
      <div>
        {
          favorited.map((recipe, index) => (
            <div key={ index }>
              {recipe.type === 'bebida' ? (
                <div>
                  <Link
                    to={ `/bebidas/${recipe.id}` }
                  >
                    <img
                      width="200px"
                      data-testid={ `${index}-horizontal-image` }
                      alt={ recipe.name }
                      src={ recipe.image }
                    />
                  </Link>
                  <Link to={ `/bebidas/${recipe.id}` }>
                    <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { recipe.alcoholicOrNot }
                  </p>
                  <button
                    type="button"
                    onClick={ () => {
                      clipboardCopy(`http://localhost:3000/bebidas/${recipe.id}`);
                      setCopied(true);
                    } }
                  >
                    { copied ? <span>Link copiado!</span> : <img
                      src={ shareIcon }
                      alt="compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                    /> }
                  </button>
                  <button
                    src={ blackHeartIcon }
                    type="button"
                    onClick={ (e) => removeFavorite(e, recipe.id) }
                  >
                    <img
                      src={ blackHeartIcon }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      alt="favorited"
                    />
                  </button>
                </div>
              ) : (
                <div key={ index }>
                  <Link
                    to={ `/comidas/${recipe.id}` }
                  >
                    <img
                      width="200px"
                      data-testid={ `${index}-horizontal-image` }
                      alt={ recipe.name }
                      src={ recipe.image }
                    />
                  </Link>
                  <Link to={ `/comidas/${recipe.id}` }>
                    <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${recipe.area} - ${recipe.category}` }
                  </p>
                  <button
                    type="button"
                    onClick={ () => {
                      clipboardCopy(`http://localhost:3000/comidas/${recipe.id}`);
                      setCopied(true);
                    } }
                  >
                    { copied ? <span>Link copiado!</span> : <img
                      src={ shareIcon }
                      alt="compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                    /> }
                  </button>
                  <button
                    src={ blackHeartIcon }
                    type="button"
                    onClick={ (e) => removeFavorite(e, recipe.id) }
                  >
                    <img
                      src={ blackHeartIcon }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      alt="favorited"
                    />
                  </button>
                </div>
              ) }
            </div>
          ))
        }
      </div>
    </div>
  );
}
