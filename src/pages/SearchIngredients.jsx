import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchAPI } from '../services';

export default function SearchIngredients({ type }) {
  const [ingredients, setIngredients] = useState([]);
  const dispatch = useDispatch();
  const twelve = 12;
  const history = useHistory();
  const path = type === 'food' ? 'comidas' : 'bebidas';

  useEffect(() => {
    const asyncFunc = async () => {
      setIngredients(await fetchAPI[type].ingredients);
    };
    asyncFunc();
  }, [type]);

  function searchIngredient(ingredient) {
    dispatch(
      { type: 'SET_SEARCH', search: { type: 'searchIngredient', key: ingredient } },
    );
    history.push(`/${path}`);
  }

  function mapFunction(element, index) {
    const ingredient = type === 'food' ? element.strIngredient : element.strIngredient1;
    return (
      <Card
        data-testid={ `${index}-ingredient-card` }
        className="d-flex flex-column align-items-center p-3 my-2 shadow-sm"
        type="button"
        key={ index }
        style={ {
          backgroundColor: (type === 'drink') ? '#a73d7e' : '#fcdc4d',
          color: 'black',
          transition: 'background-color 0.25s',
          width: '46%',
          margin: '2%',
        } }
        onClick={ () => searchIngredient(ingredient) }
      >
        <Card.Title data-testid={ `${index}-card-name` }>{ingredient}</Card.Title>
        <Card.Img
          data-testid={ `${index}-card-img` }
          className="mb-2 border border-dark bg-light"
          alt="ingrediente"
          src={ type === 'food' ? (
            `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`) : (
            `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`) }
        />
      </Card>
    );
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" type={ type } />
      <div className=" d-flex px-3 flex-wrap">
        { ingredients.slice(0, twelve).map(mapFunction) }
      </div>
      <Footer drink={ type === 'drink' } />
    </div>
  );
}

SearchIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};
