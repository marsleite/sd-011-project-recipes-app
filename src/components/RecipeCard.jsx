import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getIds } from '../services';
import { TransparentButton } from '../styles';
import ShareButton from './ShareButton';

const Card = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  border: 1px solid #F8EDED;
  display: flex;
  margin: 10px;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .recipe-img{
    width: 50%;
    min-height: 100%;
    border-radius: 6px 0 0 6px;
    img{
      width: 100%;
      border-radius: 6px 0 0 6px;
      height: 100%;
      object-fit: cover;
    }
  }
  p{
    color: #A9A9A9;
  }
  h2 {
  }
  .content{
    width: 50%;
  }
  .category {
    background-color: ${({ type }) => (type === 'bebidas' ? '#a73d7e' : '#fcdc4d')};
    border-radius: 6px;
    padding: 5px;
    margin: 2px;
    transition: background-color 0.25s;
  }
`;

export default function RecipeCard({ recipe, type, index }) {
  const { image, name, id, category, area, alcoholicOrNot, tags } = getIds(type, recipe);
  const history = useHistory();
  const path = `/${type}/${id}`;
  return (
    <Card
      data-testid={ `${index}-recipe-card` }
      type={ type }
    >
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
            <p data-testid={ `${index}-horizontal-top-text` }>
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
