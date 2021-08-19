import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import useFavoriteRecipies from '../../../hooks/useFavoriteRecipies';

import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';

const FavoriteButton = ({
  favoriteFood,
  favoriteDrink,
  drinkOrFood,
}) => {
  const { favoriteTrue, setFavoriteTrue, favoriteRecipe } = useFavoriteRecipies(
    favoriteFood,
    favoriteDrink,
    drinkOrFood,
  );

  const history = useHistory();
  useEffect(() => {
    const favoritedStore = localStorage.favoriteRecipes;
    if (favoritedStore) {
      const saveLocalStorage = JSON.parse(favoritedStore)
        .some((trueOrFalse) => history.location.pathname.includes(trueOrFalse.id));

      if (saveLocalStorage) {
        setFavoriteTrue(true);
      }
    }
  }, [history.location.pathname, setFavoriteTrue]);

  return (
    <button
      type="button"
      onClick={ () => favoriteRecipe() }
    >
      <img
        data-testid="favorite-btn"
        src={
          !favoriteTrue
            ? whiteHeartIcon
            : blackHeartIcon
        }
        alt="Icon to favorite foods"
      />
    </button>
  );
};

const mapStateToProps = (state) => ({
  favoriteFood: state.recipeDetailsReducer.meal,
  favoriteDrink: state.recipeDetailsReducer.drink,
});

FavoriteButton.propTypes = ({
  thumb: PropTypes.img,
  alt: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(FavoriteButton);
