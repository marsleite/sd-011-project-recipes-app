import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import RecipesContext from '../../context/RecipesContext';

function DetailsFavoriteButton({ id }) {
  const [favorited, setFavorited] = useState(false);
  const { mealId } = useContext(RecipesContext);

  function removeFavorite(favorites) {
    setFavorited(false);
    if (favorites.length === 1) {
      localStorage.removeItem('favoriteRecipes');
      return;
    }
    const newFavorites = favorites
      .filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }

  function handleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteMeals = {
      id: mealId.idMeal,
      type: 'comida',
      area: mealId.strArea,
      category: mealId.strCategory,
      alcoholicOrNot: '',
      name: mealId.strMeal,
      image: mealId.strMealThumb,
    };
    if (favorites === null) {
      setFavorited(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteMeals]));
      return;
    }
    const isFavorited = favorites.some((favorite) => favorite.id === id);
    if (isFavorited) {
      removeFavorite(favorites);
      return;
    }
    setFavorited(true);
    favorites.push(favoriteMeals);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if ((favorites !== null)) {
      setFavorited(true);
    }
  }, [id]);

  return (
    <button
      type="button"
      onClick={ () => handleFavorite() }
    >
      <img
        src={ (favorited) ? blackHeartIcon : whiteHeartIcon }
        alt="blackHeartIcon"
        data-testid="favorite-btn"
      />
    </button>
  );
}

DetailsFavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailsFavoriteButton;
