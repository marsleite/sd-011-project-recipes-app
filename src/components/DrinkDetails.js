import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { fetchDrinkDetailsFromCocktailsDB,
  fetchRecommendedMealsFromMealsDB } from '../services';
import { setFavoriteDrinkInLocalStorage } from '../helpers';
import share from '../images/share.png';
import favoritar from '../images/favoritar.png';
import favoritado from '../images/favoritado.png';
import MapIngredients from './MapIngredients';
import RecommendedMeals from './RecommendedMeals';
import '../styles/Details.css';

function DrinkDetails(props) {
  const [dataToManipulate, setDataToManipulate] = useState({});
  const [meals, setMeals] = useState([]);
  const [statusControl, setStatusControl] = useState({
    isVisible: true,
    isInProgress: false,
    isFavorited: false,
    isLinkCopied: false,
  });
  const { isVisible, isInProgress, isFavorited, isLinkCopied } = statusControl;
  const { strDrinkThumb, strDrink, strAlcoholic,
    strInstructions } = dataToManipulate;

  const urlLengthToGetId = 30;
  const drinksId = window.location.href.slice(urlLengthToGetId);

  async function fetchMealAndDrinkDataFromAPI() {
    const drinkDetails = await fetchDrinkDetailsFromCocktailsDB(drinksId);
    const recommendedMeals = await fetchRecommendedMealsFromMealsDB();
    setDataToManipulate(...drinkDetails);
    console.log(dataToManipulate);
    setMeals(recommendedMeals);
  }

  function readLocalStorage() {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getDoneRecipes) {
      const isRecipeDone = getDoneRecipes.some((recipe) => recipe.id === drinksId);
      setStatusControl({
        ...statusControl,
        isVisible: !isRecipeDone,
      });
    }
    if (getInProgressRecipes) {
      const isRecipeInProgress = Boolean(getInProgressRecipes.cocktails[drinksId]);
      setStatusControl({
        ...statusControl,
        isInProgress: isRecipeInProgress,
      });
    }
    if (getFavoriteRecipes) {
      const isRecipeFavorited = getFavoriteRecipes
        .some((recipe) => recipe.id === drinksId);
      setStatusControl({
        ...statusControl,
        isFavorited: isRecipeFavorited,
      });
    }
  }

  function handleStartRecipeButtonClick() {
    const { history } = props;
    history.push(`/bebidas/${drinksId}/in-progress`);
  }

  function handleShareButtonClick() {
    copy(window.location.href);
    setStatusControl({
      ...statusControl,
      isLinkCopied: true,
    });
  }

  function handleLikeButtonClick() {
    setStatusControl({
      ...statusControl,
      isFavorited: !isFavorited,
    });
    setFavoriteDrinkInLocalStorage(dataToManipulate);
  }

  const iconsRender = () => (
    <>
      <button
        data-testid="share-btn"
        onClick={ handleShareButtonClick }
        type="button"
        aria-label="share-icon"
      >
        <img src={ share } alt="share-icon" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        aria-label="favorite-icon"
        onClick={ handleLikeButtonClick }
        src={ isFavorited ? favoritado : favoritar }
      >
        {isFavorited ? <img src={ favoritado } alt="favorited-icon" />
          : <img src={ favoritar } alt="favorite-icon" />}
      </button>
    </>
  );

  const buttonRender = () => (
    <button
      className="start-button"
      data-testid="start-recipe-btn"
      onClick={ handleStartRecipeButtonClick }
      type="button"
    >
      {isInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );

  useEffect(() => {
    fetchMealAndDrinkDataFromAPI();
    readLocalStorage();
  }, []);

  return (
    <section className="details-section">
      <div className="header">
        <Link to="/bebidas" className="home">
          Voltar
        </Link>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="" />
        {/* <div className="recipe-title"> */}
        {iconsRender()}
        {isLinkCopied && <p>Link copiado!</p>}
        {/* </div> */}
      </div>
      <div className="meal-name">
        <h1 className="title" data-testid="recipe-title">{strDrink}</h1>
        <h5 data-testid="recipe-category">{strAlcoholic}</h5>
      </div>
      <div id="ingredients" className="ingredients">
        <h4>Ingredients</h4>
        <MapIngredients dataToManipulate={ dataToManipulate } />
      </div>
      <div className="instructions">
        <h4>Instructions</h4>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <div id="recommendations" className="recommendations">
        <h4>Recommendations</h4>
        <RecommendedMeals meals={ meals } />
      </div>
      {isVisible && buttonRender()}
    </section>
  );
}

DrinkDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func }).isRequired,
};

export default withRouter(DrinkDetails);
