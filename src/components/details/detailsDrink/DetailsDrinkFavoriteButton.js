import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import RecipesContext from '../../../context/RecipesContext';

function DetailsDrinkFavoriteButton({ id }) {
  const [favorited, setFavorited] = useState(false);
  const { drinkId } = useContext(RecipesContext);

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
    const favoriteDrinks = {
      id: drinkId.idDrink,
      type: 'bebida',
      area: '',
      category: drinkId.strCategory,
      alcoholicOrNot: drinkId.strAlcoholic,
      name: drinkId.strDrink,
      image: drinkId.strDrinkThumb,
    };
    if (favorites === null) {
      setFavorited(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteDrinks]));
      return;
    }
    const isFavorited = favorites.some((favorite) => favorite.id === id);
    if (isFavorited) {
      removeFavorite(favorites);
      return;
    }
    setFavorited(true);
    favorites.push(favoriteDrinks);
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

DetailsDrinkFavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailsDrinkFavoriteButton;
