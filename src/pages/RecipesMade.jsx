import React, { useState, useRef, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Layout } from '../components';

import '../styles/pages/RecipesMade.css';

import { useLocalStorage } from '../hooks';
import shareIcon from '../images/shareIcon.svg';

function RecipesMade() {
  const [handleShareLink, sethanleShareLink] = useState(false);
  const [filteredCompleteRecipes, setFilteredCompleteRecipes] = useState([]);
  const storedRecipes = useRef([]);
  const { getDoneRecipes } = useLocalStorage();

  useEffect(() => {
    storedRecipes.current = getDoneRecipes();
    console.log(storedRecipes.current);
    setFilteredCompleteRecipes([...storedRecipes.current]);
  }, [getDoneRecipes]);

  const handleShareButton = ({ type, id }) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    sethanleShareLink(true);
    const magicNumberTimer = 2000;
    setTimeout(() => {
      sethanleShareLink(false);
    }, magicNumberTimer);
  };

  const handleClickFilter = ({ target: { value } }) => {
    setFilteredCompleteRecipes(storedRecipes
      .current.filter(({ type }) => type.includes(value)));
  };

  return (
    <Layout title="Receitas Feitas" noFooter>
      <main className="RECIPES_MADE">
        <section className="RECIPE_CARD_FILTERS">
          <button
            className="button"
            type="button"
            value=""
            data-testid="filter-by-all-btn"
            onClick={ (event) => handleClickFilter(event) }
          >
            All
          </button>
          <button
            className="button"
            type="button"
            value="comida"
            data-testid="filter-by-food-btn"
            onClick={ (event) => handleClickFilter(event) }
          >
            Food
          </button>
          <button
            className="button"
            type="button"
            value="bebida"
            data-testid="filter-by-drink-btn"
            onClick={ (event) => handleClickFilter(event) }
          >
            Drinks
          </button>
        </section>
        <ul className="RECIPE_CARD_LIST">
          { console.log(filteredCompleteRecipes) }
          {filteredCompleteRecipes.map((recipes, index) => (
            <li key={ recipes.id }>
              <section className="main-infos">
                <div>
                  <h1
                    className="title"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { recipes.name }
                  </h1>
                  <h2
                    className="category"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipes.area || recipes.alcoholicOrNot} - ${recipes.category}` }
                  </h2>
                </div>
                <input
                  className="icon"
                  alt="share button"
                  type="image"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => handleShareButton(recipes) }
                />
              </section>
              <section className="picture-container">
                <Link to={ `${recipes.type === 'meals' ? 'comidas' : 'bebidas'}/${recipes.id}` }>
                  <img
                    className="picture"
                    alt={ recipes.name }
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipes.image }
                  />
                </Link>
                <div className="secondary-info">
                  <ol className="tags">
                    {recipes.tags.map((tags) => (
                      <li
                        key={ tags }
                        className="tag"
                        data-testid={ `${index}-${tags}-horizontal-tag` }
                      >
                        { tags }
                      </li>
                    ))}
                  </ol>
                  <h2
                    className="done-date"
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    Feito em { recipes.doneDate }
                  </h2>
                </div>
              </section>
              {handleShareLink && <span>Link copiado!</span>}
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}

export default RecipesMade;
