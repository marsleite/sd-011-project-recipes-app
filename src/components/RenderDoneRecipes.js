import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RenderDoneRecipes() {
  const [copyOk, setCopyOk] = useState(false);
  const doneRecipes = useState(
    JSON.parse(localStorage.getItem('doneRecipes'))
    || [],
  )[0];
  const [filter, setFilter] = useState('todo');
  const [recipesToRender, setRecipesToRendes] = useState([]);

  function handleClick({ target: { value } }) {
    const filterToUse = filter === value
      ? 'todo'
      : value;
    setFilter(filterToUse);
  }

  useEffect(() => {
    switch (filter) {
    case 'todo':
      setRecipesToRendes(doneRecipes);
      break;
    default:
      setRecipesToRendes(doneRecipes.filter((recipe) => recipe.type === filter));
    }
  }, [filter, doneRecipes]);

  if (recipesToRender.length !== 0) {
    return (
      <div>
        <section className="filter-recipes">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            value="todo"
            onClick={ handleClick }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            value="comida"
            onClick={ handleClick }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            value="bebida"
            onClick={ handleClick }
          >
            Drinks
          </button>
        </section>
        { recipesToRender.map((recipe, index) => (
          <div className="done-card" key={ index }>
            <Link className="done-link" to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                width="50px"
              />
            </Link>
            <section className="done-info">
              <Link className="done-card-link" to={ `/${recipe.type}s/${recipe.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                <button
                  type="button"
                  onClick={ () => {
                    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                    setCopyOk(true);
                  } }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="share"
                  />
                </button>
                { copyOk && <p>Link copiado!</p> }
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.type === 'comida'
                  ? `${recipe.area} - ${recipe.category}`
                  : recipe.alcoholicOrNot }
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `Feito em: ${recipe.doneDate}` }
              </p>

              { recipe.type === 'comida' && recipe.tags.map((tag, index2) => (
                <section key={ index } className="tag-container">
                  <p
                    key={ index2 }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                </section>
              ))}
            </section>
          </div>
        ))}
      </div>
    );
  }
  return <p>Loading...</p>;
}

export default RenderDoneRecipes;
