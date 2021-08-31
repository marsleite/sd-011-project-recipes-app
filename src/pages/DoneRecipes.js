import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/components/done.css';
import '../styles/components/category.css';

export default function DoneRecipes() {
  const pageTitle = {
    pageName: 'Receitas Feitas',
    setIcon: false,
  };
  const recipeStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [doneRecipes, setDoneRecipes] = useState(recipeStorage);
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <Header value={ pageTitle } />
      <div className="done-container">
        <div className="category-container">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setDoneRecipes(recipeStorage) }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setDoneRecipes(recipeStorage
              .filter((recipes) => recipes.type === 'comida')) }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setDoneRecipes(recipeStorage
              .filter((recipes) => recipes.type === 'bebida')) }
          >
            Drinks
          </button>
        </div>
        <div className="done-card">
          {
            doneRecipes.map((recipe, index) => (
              <div key={ index }>
                {recipe.type === 'bebida' ? (
                  <div className="done-info-container">
                    <div className="done-info-img">
                      <Link
                        to={ `/bebidas/${recipe.id}` }
                      >
                        <img
                          width="200px"
                          data-testid={ `${index}-horizontal-image` }
                          alt={ recipe.name }
                          src={ recipe.image }
                        />
                      </Link>
                    </div>
                    <div className="done-info">
                      <Link to={ `/bebidas/${recipe.id}` }>
                        <h6
                          data-testid={ `${index}-horizontal-name` }
                        >
                          { recipe.name }
                        </h6>
                      </Link>
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        { recipe.alcoholicOrNot }
                      </p>
                      <span data-testid={ `${index}-horizontal-done-date` }>
                        Feito em:
                        { recipe.doneDate }
                      </span>
                      <button
                        className="done-info-button"
                        type="button"
                        onClick={ () => {
                          clipboardCopy(`http://localhost:3000/bebidas/${recipe.id}`);
                          setCopied(true);
                        } }
                      >
                        { copied ? <span>Link copiado!</span> : <img
                          src={ shareIcon }
                          alt="compartilhar"
                          data-testid={ `${index}-horizontal-share-btn` }
                        /> }
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="done-info-container" key={ index }>
                    <div className="done-info-img">
                      <Link
                        to={ `/comidas/${recipe.id}` }
                      >
                        <img
                          data-testid={ `${index}-horizontal-image` }
                          alt={ recipe.name }
                          src={ recipe.image }
                        />
                      </Link>
                    </div>
                    <div className="done-info">
                      <Link to={ `/comidas/${recipe.id}` }>
                        <h6
                          data-testid={ `${index}-horizontal-name` }
                        >
                          { recipe.name }
                        </h6>
                      </Link>
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        { `${recipe.area} - ${recipe.category}` }
                      </p>
                      <span data-testid={ `${index}-horizontal-done-date` }>
                        Feito em:
                        { recipe.doneDate }
                      </span>
                      <button
                        className="done-info-button"
                        type="button"
                        onClick={ () => {
                          clipboardCopy(`http://localhost:3000/comidas/${recipe.id}`);
                          setCopied(true);
                        } }
                      >
                        { copied ? <span>Link copiado!</span> : <img
                          src={ shareIcon }
                          alt="compartilhar"
                          data-testid={ `${index}-horizontal-share-btn` }
                        /> }
                      </button>
                      {
                        recipe.tags.map((tag, idx) => (
                          <p
                            key={ idx }
                            data-testid={ `${index}-${tag}-horizontal-tag` }
                          >
                            { tag }
                          </p>
                        ))
                      }
                    </div>
                  </div>
                ) }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
