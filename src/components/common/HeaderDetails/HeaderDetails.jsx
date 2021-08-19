import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './HeaderDetails.css';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

const HeaderDetails = (
  {
    thumb,
    alt,
    category,
    drinkOrFood,
    removeUrl,
  },
) => (
  <header>
    {
      thumb
        ? (
          <img
            className="thumbMeal-style"
            src={ thumb }
            alt={ `showing ${alt} product` }
            data-testid="recipe-photo"
          />
        )
        : <h1>Carregando</h1>
    }
    <h4 data-testid="recipe-title">{alt}</h4>
    <h6 data-testid="recipe-category">{category}</h6>
    <FavoriteButton drinkOrFood={ drinkOrFood } />
    <ShareButton removeUrl={ removeUrl } />
  </header>
);

const mapStateToProps = (state) => ({
  favoriteFood: state.recipeDetailsReducer.meal,
  favoriteDrink: state.recipeDetailsReducer.drink,
});

HeaderDetails.propTypes = ({
  thumb: PropTypes.img,
  alt: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(HeaderDetails);
