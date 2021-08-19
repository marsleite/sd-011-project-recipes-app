import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { getIds } from '../services';
import { TransparentButton, Card } from '../styles';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

export default function RecipeCard({ recipe, type, index }) {
  const recipeIds = getIds(type, recipe);
  const {
    image, name, id, category, area, alcoholicOrNot, tags, type: recipeType,
  } = recipeIds;
  const history = useHistory();
  const path = `/${type}/${id}`;
  return (
    <Card
      data-testid={ `${index}-recipe-card` }
      type={ type }
    >
      <FavoriteButton
        recipe={ recipeIds }
        drinkOrFood={ recipeType }
        dataTestid={ `${index}-horizontal-favorite-btn` }
      />
      <TransparentButton className="recipe-img" onClick={ () => history.push(path) }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
      </TransparentButton>
      <div className="content m-2">
        <div className="d-flex justify-content-between">
          <TransparentButton onClick={ () => history.push(path) }>
            <p data-testid={ `${index}-horizontal-top-text` } className="subtitle">
              {(type === 'comidas') ? (
                `${area} - ${category}`) : alcoholicOrNot }
            </p>
            <h2 data-testid={ `${index}-card-name` }>{ name }</h2>
          </TransparentButton>
          <ShareButton
            dataTestid={ `${index}-horizontal-share-btn` }
            type={ type }
            id={ id }
          />
        </div>
        <div className="d-flex flex-wrap">
          {
            (tags) && tags.map((element, key) => (
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
      </div>
    </Card>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
};
