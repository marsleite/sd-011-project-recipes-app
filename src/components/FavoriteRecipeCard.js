import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import share from '../images/share.png';
import favoritar from '../images/favoritar.png';
import favoritado from '../images/favoritado.png';
import '../styles/Details.css';

export default function FavoriteRecipeCard({
  index,
  recipe,
  isFavorited,
  handleLikeButtonClick,
}) {
  const [linkCopied, setLinkCopied] = useState(false);

  const url = recipe.type === 'comida'
    ? `/comidas/${recipe.id}`
    : `/bebidas/${recipe.id}`;

  function handleShareButtonClick() {
    copy(`http://localhost:3000${url}`);
    setLinkCopied(true);
  }

  return (
    <div className="favorite-card">
      <div>
        <Link to={ url }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt=""
          />
        </Link>
      </div>
      <div className="info-container">
        <div>
          <h4 data-testid={ `${index}-horizontal-top-text` }>
            {
              recipe.type === 'comida'
                ? `${recipe.area} - ${recipe.category}`
                : recipe.alcoholicOrNot
            }
          </h4>
          <Link to={ url }>
            <h5
              className="title"
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </h5>
          </Link>
        </div>
        <div className="icon-buttons">
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ handleShareButtonClick }
            type="button"
            aria-label="share-icon"
            src={ share }
          >
            {linkCopied ? 'Link copiado!' : <img src={ share } alt="share-icon" /> }
          </button>
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            type="button"
            aria-label="favorite-icon"
            onClick={ handleLikeButtonClick }
            src={ isFavorited ? favoritado : favoritar }
          >
            <img
              src={ isFavorited
                ? favoritado
                : favoritar }
              alt="favorited-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  isFavorited: PropTypes.bool.isRequired,
  handleLikeButtonClick: PropTypes.func.isRequired,
};
