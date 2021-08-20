import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteButton(props) {
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem('favoriteRecipes');

    if (isFavorite && storage === null) {
      const newItem = [
        {
          id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newItem));
    }

    if (storage !== null) {
      const favoriteItemsArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const itemFound = favoriteItemsArray.find((item) => item.id === id);

      if (!isFavorite && itemFound) {
        setIsFavorite(true);
      }

      if (isFavorite && !itemFound) {
        const newFavoriteItems = {
          id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
        };
        favoriteItemsArray.push(newFavoriteItems);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteItemsArray));
        setIsFavorite(true);
      }

      if (!isFavorite && itemFound) {
        localStorage.setItem('favoriteRecipes', JSON.stringify(
          favoriteItemsArray.filter((item) => item.id !== id),
        ));
        setIsFavorite(false);
      }
    }
  }, [isFavorite, id]);

  return (
    <div>
      {
        isFavorite
          ? (
            <button
              type="button"
              src={ BlackHeartIcon }
              onClick={ () => setIsFavorite(false) }
              data-testid="favorite-btn"
            >
              <img src={ BlackHeartIcon } alt="Botão de favoritar" />
            </button>
          )
          : (
            <button
              type="button"
              src={ WhiteHeartIcon }
              onClick={ () => setIsFavorite(true) }
              data-testid="favorite-btn"
            >
              <img src={ WhiteHeartIcon } alt="Botão de favoritar" />
            </button>
          )

      }
    </div>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  area: PropTypes.string,
  category: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
}.isRequired;
