import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import loading from '../images/loading.gif';

import '../styles/pages/Details.css';

import { Layout, ShareButton, FavoriteButton } from '../components';

import { useLocalStorage } from '../hooks';

const RECOMMENDATION_NUMBER = 6;
const NOT_FOUND_INDEX = -1;

const renderLoadingOrError = (error, isLoading) => {
  if (isLoading) {
    return (
      <img
        src={ loading }
        alt="carregando"
        width="100px"
      />
    );
  }

  if (error) return <p>Opa... algo deu errado</p>;

  return false;
};

function FoodDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [drinksLoading, setDrinksLoading] = useState(true);
  const [drinksError, setDrinksError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const { getDoneRecipes, getInProgressRecipeByType } = useLocalStorage();

  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php'; // TODO usar token
  const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    fetch(`${BASE_URL}?i=${id}`)
      .then((response) => response.json())
      .then((result) => setRecipe(result.meals[0]))
      .catch(setError)
      .finally(() => setIsLoading(false));

    fetch(DRINKS_URL)
      .then((response) => response.json())
      .then((result) => setDrinks(result.drinks))
      .catch(setDrinksError)
      .finally(() => setDrinksLoading(false));

    setIsDone(getDoneRecipes().findIndex((r) => r.id === id) !== NOT_FOUND_INDEX);
    setIsInProgress(getInProgressRecipeByType('meals')[id] !== undefined);
  }, [id, getInProgressRecipeByType, getDoneRecipes]);

  const renderNoRecipeMessage = () => renderLoadingOrError(error, isLoading);

  const renderNoDrinksMessage = () => renderLoadingOrError(drinksError, drinksLoading);

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
                <h1 className="title">Ingredients</h1>

                <div className="container">
                  <ol className="ingredients">
                    { Object.keys(recipe)
                      .filter((key) => /strIngredient/i.test(key))
                      .filter((key) => recipe[key] !== '')
                      .map((key) => {
                        const index = parseInt(key.replace('strIngredient', ''), 10);
                        return (
                          <li
                            key={ index }
                            data-testid={ `${index - 1}-ingredient-name-and-measure` }
                          >
                            <span>{ recipe[key] }</span>
                            <span> - </span>
                            <span>{ recipe[`strMeasure${index}`] }</span>
                          </li>
                        );
                      }) }
                  </ol>
                </div>
              </section>

              <section className="section">
                <h1 className="title">Instructions</h1>

                <div className="container">
                  <p className="instructions" data-testid="instructions">{ recipe.strInstructions }</p>
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

              {/* <section className="r">
                <h1>Recomendações de bebida</h1>

                { renderNoDrinksMessage() || (
                  <ol style={ styles.drinkRecommendationList }>
                    { drinks.slice(0, RECOMMENDATION_NUMBER).map((drink, index) => (
                      <li
                        style={ styles.drinksRecommendationCard }
                        data-testid={ `${index}-recomendation-card` }
                        key={ drink.idDrink }
                      >
                        <img
                          style={ styles.drinksRecommendationImage }
                          src={ drink.strDrinkThumb }
                          alt={ drink.strDrink }
                        />
                        <h1
                          data-testid={ `${index}-recomendation-title` }
                        >
                          { drink.strDrink }
                        </h1>
                      </li>
                    )) }
                  </ol>
                ) }
              </section> */}

              { !isDone && (
                <section className="action-section">
                  <button
                    className="action-button"
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ () => {
                      history.push(`/comidas/${id}/in-progress`);
                    } }
                  >
                    { isInProgress ? <>Continuar Receita</> : <>Iniciar Receita</> }
                  </button>
                </section>)}
            </>
          ) }
      </main>
    </Layout>
  );
}

export default FoodDetails;
