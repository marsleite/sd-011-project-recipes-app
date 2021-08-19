import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import share from '../images/share.png';
import '../styles/DoneRecipes.css';

export default function DoneRecipeCard({
  index,
  recipe,
}) {
  const [linkCopied, setLinkCopied] = useState(false);

  const url = recipe.type === 'comida'
    ? `/comidas/${recipe.id}`
    : `/bebidas/${recipe.id}`;

  const { tags } = recipe;

  function handleShareButtonClick() {
    copy(`http://localhost:3000${url}`);
    setLinkCopied(true);
  }

  return (
    <div className="done-recipe">
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
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }

          </p>
          { tags.map((tag) => (
            <p
              key={ index }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>)) }
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
        </div>
      </div>
    </div>
  );
}
// roda git
DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};
