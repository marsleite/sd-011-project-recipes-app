import React from 'react';
import { useHistory } from 'react-router-dom';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import { Card, TransparentButton } from '../styles';

export default function FavoriteCard({ recipe, index }) {
  const history = useHistory();
  if (recipe) {
    const path = `/${recipe.type}s/${recipe.id}`;
    return (
      <Card type={ recipe.type }>
        <TransparentButton onClick={ () => window.location.reload() }>
          <FavoriteButton
            recipe={ recipe }
            drinkOrFood={ recipe.type }
            dataTestid={ `${index}-horizontal-favorite-btn` }
          />
        </TransparentButton>
        <TransparentButton className="recipe-img" onClick={ () => history.push(path) }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </TransparentButton>
        <div className="content m-2">
          <div className="d-flex justify-content-between">
            <TransparentButton onClick={ () => history.push(path) }>
              <p data-testid={ `${index}-horizontal-top-text` } className="subtitle">
                {(recipe.type === 'comida') ? (
                  `${recipe.area} - ${recipe.category}`) : recipe.alcoholicOrNot }
              </p>
              <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
            </TransparentButton>
            <ShareButton
              dataTestid={ `${index}-horizontal-share-btn` }
              type={ recipe.type }
              id={ recipe.id }
            />
          </div>
          <p>
            Feita em:
            <span data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate }
            </span>
          </p>
          <TransparentButton
            type="button"
            onClick={ () => history.push(path) }
          >
            <div className="d-flex flex-wrap">
              {
                (recipe.tags) && recipe.tags.map((element, key) => (
                  <div
                    key={ key }
                    className="category"
                    data-testid={ `${index}-${element}-horizontal-tag` }
                  >
                    { element }
                  </div>
                ))
              }
            </div>
          </TransparentButton>
        </div>
      </Card>
    );
  }
}
