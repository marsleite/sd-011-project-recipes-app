import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import loading from '../images/loading.gif';

import { Layout, FavoriteButton, ShareButton } from '../components';

import { useLocalStorage } from '../hooks';

const NOT_FOUND_INDEX = -1;

const renderLoadingOrError = (error, isLoading) => {
  if (isLoading) {
    return <img src={ loading } alt="carregando" width="100px" />;
  }

  if (error) return <p>Opa... algo deu errado</p>;

  return false;
};

function FoodProgress() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const {
    getFavoriteRecipes,
    getInProgressRecipeByType,
    updateInProgressRecipe,
    addDoneRecipes,
  } = useLocalStorage();

  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php'; // TODO usar token

  useEffect(() => {
    fetch(`${BASE_URL}?i=${id}`)
      .then((response) => response.json())
      .then((result) => setRecipe(result.meals[0]))
      .catch(setError)
      .finally(() => setIsLoading(false));

    const inProgressMeals = getInProgressRecipeByType('meals');
    const inProgressIngredients = inProgressMeals[id] || [];
    setUsedIngredients(inProgressIngredients);
  }, [id, getFavoriteRecipes, getInProgressRecipeByType]);

  useEffect(() => {
    if (!recipe) return;

    setIngredients(Object.keys(recipe)
      .filter((key) => /strIngredient/i.test(key))
      .filter((key) => recipe[key] !== '' && recipe[key] !== null));
  }, [recipe]);

  const renderNoRecipeMessage = () => renderLoadingOrError(error, isLoading);

  return (
    <Layout title="App de Receitas" noFooter noHeader>
      <main className="RECIPE_DETAILS">
        { !recipe ? renderNoRecipeMessage()
          : (
            <>
              <header className="header">
                <div className="info">
                  <h1 className="title" data-testid="recipe-title">{ recipe.strMeal }</h1>
                  <h2 className="category" data-testid="recipe-category">{ recipe.strCategory }</h2>
                </div>
                <div className="actions">
                  <ShareButton id={ id } type="comida" />
                  <FavoriteButton recipe={ recipe } />
                </div>
              </header>
              <section className="picture-container">
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid="recipe-photo"
                />
              </section>
              <section className="section">
                <h1 className="title">Ingredientes</h1>

                <div className="container">
                  <ol className="ingredients">
                    { ingredients.map((key) => {
                      const index = parseInt(key.replace('strIngredient', ''), 10);
                      return (
                        <li
                          key={ index }
                          data-testid={ `${index - 1}-ingredient-step` }
                        >
                          <label
                            className="label"
                            htmlFor={ `${index}-ingredient-checkbox` }
                          >
                            <input
                              type="checkbox"
                              id={ `${index}-ingredient-checkbox` }
                              checked={ usedIngredients
                                .indexOf(recipe[key]) !== NOT_FOUND_INDEX }
                              onChange={ () => {
                                const newUsedIngredients = [...usedIngredients];
                                if (newUsedIngredients
                                  .indexOf(recipe[key]) === NOT_FOUND_INDEX) {
                                  newUsedIngredients.push(recipe[key]);
                                } else {
                                  newUsedIngredients
                                    .splice(newUsedIngredients.indexOf(recipe[key]), 1);
                                }
                                setUsedIngredients(newUsedIngredients);
                                updateInProgressRecipe(
                                  'meals',
                                  { id, usedIngredients: newUsedIngredients },
                                );
                              } }
                            />
                            <span>{ recipe[key] }</span>
                            <span> - </span>
                            <span>{ recipe[`strMeasure${index}`] }</span>
                          </label>
                        </li>
                      );
                    }) }
                  </ol>
                </div>
              </section>

              <section className="section">
                <h1 className="title">Instructions</h1>

                <div className="container">
                  <p data-testid="instructions">{ recipe.strInstructions }</p>
                </div>
              </section>

              <section className="video-container">
                <iframe
                  data-testid="video"
                  width="560"
                  height="315"
                  src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer;clipboard-write; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </section>

              <section className="action-section">
                <button
                  className="action-button"
                  type="button"
                  data-testid="finish-recipe-btn"
                  onClick={ () => {
                    addDoneRecipes({
                      id,
                      type: 'comida',
                      area: recipe.strArea,
                      category: recipe.strCategory,
                      alcoholicOrNot: '',
                      name: recipe.strMeal,
                      image: recipe.strMealThumb,
                      doneDate: new Date().toLocaleDateString(),
                      tags: recipe.strTags.split(','),
                    });
                    history.push('/receitas-feitas');
                  } }
                  disabled={ usedIngredients.length !== ingredients.length }
                >
                  Finalizar receita
                </button>

              </section>
            </>
          ) }
      </main>
    </Layout>
  );
}

export default FoodProgress;
