import React, { useState, useRef, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Layout, FavoriteButton } from '../components';
import { useLocalStorage } from '../hooks';

import '../styles/pages/FavoriteRecipes.css';

import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const { getFavoriteRecipes } = useLocalStorage();
  const [handleShareLink, sethanleShareLink] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const storedRecipes = useRef([]);
  useEffect(() => {
    storedRecipes.current = getFavoriteRecipes();
    setFavoriteRecipes(storedRecipes.current);
  }, [getFavoriteRecipes]);

  const handleShareButton = ({ type, id }) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    sethanleShareLink(true);
    const magicNumberTimer = 2000;
    setTimeout(() => {
      sethanleShareLink(false);
    }, magicNumberTimer);
  };

  const handleClickFilter = ({ target: { value } }) => {
    setFavoriteRecipes(storedRecipes
      .current.filter(({ type }) => type.includes(value)));
  };

  return (
    <Layout title="Receitas Favoritas" noFooter>
      <main className="FAVORITE_RECIPES">
        { console.log(JSON.parse(localStorage.getItem('favoriteRecipes')))}
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
          {favoriteRecipes.map((recipes, index) => (
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
                <div className="controls">
                  <input
                    className="icon"
                    alt="share button"
                    type="image"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    onClick={ () => handleShareButton(recipes) }
                  />
                  <FavoriteButton
                    index={ index }
                    callback={ () => {
                      setFavoriteRecipes((prev) => prev.filter((r) => r.id !== recipes.id));
                      storedRecipes.current = storedRecipes.current
                        .filter((r) => r.id !== recipes.id);
                    } }
                    recipe={ recipes }
                  />
                </div>
              </section>
              <section className="picture-container">
                <Link to={ `${recipes.type}s/${recipes.id}` }>
                  <img
                    className="picture"
                    alt={ recipes.name }
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipes.image }
                  />
                </Link>
              </section>
              {handleShareLink && <span>Link copiado!</span>}
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}

export default FavoriteRecipes;
