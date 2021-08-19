import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import shareIcon from '../images/shareIcon.svg';

const CompletedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipe] = useState([]);
  const [message, setmessage] = useState(null);
  const [indexOfmessage, setIndexOfmessage] = useState(null);

  React.useEffect(() => {
    const storage = localStorage.getItem('doneRecipes');

    if (storage) {
      setRecipes(JSON.parse(storage));
      setFilteredRecipe(JSON.parse(storage));
    }
  }, []);

  function handleClickFilters({ target: { value } }) {
    if (value === 'comida') {
      setFilteredRecipe(recipes.filter((recipe) => recipe.type === 'comida'));
    } else if (value === 'bebida') {
      setFilteredRecipe(recipes.filter((recipe) => recipe.type === 'bebida'));
    } else setFilteredRecipe(recipes);
  }

  function handleClick(index, type, id) {
    const url = window.location.href.split('/receitas-feitas')[0];
    navigator.clipboard.writeText(`${url}/${type}s/${id}`);
    setmessage('Link copiado!');
    setIndexOfmessage(index);
    const time = 3000;
    setTimeout(() => {
      setmessage(null);
    }, time);
  }

  return (
    <div>
      { console.log('test') }
      <Header page="Receitas Feitas" />
      <button
        type="button"
        value="all"
        data-testid="filter-by-all-btn"
        onClick={ handleClickFilters }
      >
        All
      </button>
      <button
        type="button"
        value="comida"
        data-testid="filter-by-food-btn"
        onClick={ handleClickFilters }
      >
        Food
      </button>
      <button
        type="button"
        value="bebida"
        data-testid="filter-by-drink-btn"
        onClick={ handleClickFilters }
      >
        Drinks
      </button>
      <div>
        {filteredRecipes.map((recipe, index) => {
          const {
            image,
            type,
            id,
            category,
            name,
            area,
            alcoholicOrNot,
            doneDate,
            tags,
          } = recipe;

          return (
            <div key={ id }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt=""
                  data-testid={ `${index}-horizontal-image` }
                  width="120px"
                />
                <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
              </Link>
              {area ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${area} - ${category}` }
                </p>
              ) : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { alcoholicOrNot }
                </p>
              )}
              <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
              <button type="button" onClick={ () => handleClick(index, type, id) }>
                <img
                  src={ shareIcon }
                  alt=""
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              {index === indexOfmessage && <p>{message}</p>}
              {tags.length > 0 && tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompletedRecipes;
