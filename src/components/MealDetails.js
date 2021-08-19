import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { fetchMealDetailsFromMealsDB,
  fetchRecommendedBeveragesFromCocktailsDB } from '../services';
import { setFavoriteMealInLocalStorage } from '../helpers';
import share from '../images/share.png';
import favoritar from '../images/favoritar.png';
import favoritado from '../images/favoritado.png';
import '../styles/Details.css';
import RecommendedBeverages from './RecommendedBeverages';
import MapIngredients from './MapIngredients';

function MealDetails(props) {
  const [dataToManipulate, setDataToManipulate] = useState({});
  const [beverages, setBeverages] = useState([]);
  const [statusControl, setStatusControl] = useState({
    isVisible: true,
    isInProgress: false,
    isFavorited: false,
    isLinkCopied: false,
  });
  const { isVisible, isInProgress, isFavorited, isLinkCopied } = statusControl;
  const { strYoutube, strMealThumb, strMeal, strCategory,
    strInstructions } = dataToManipulate;

  const urlLengthToGetId = 30;
  const mealsId = window.location.href.slice(urlLengthToGetId);
  const videoURL = strYoutube ? strYoutube
    .split('https://www.youtube.com/watch?v=')[1] : '';

  async function fetchMealAndDrinkDataFromAPI() {
    const mealsDetails = await fetchMealDetailsFromMealsDB(mealsId);
    const recommendedDrinks = await fetchRecommendedBeveragesFromCocktailsDB();
    setDataToManipulate(...mealsDetails);
    console.log(dataToManipulate);
    setBeverages(recommendedDrinks);
  }

  function readLocalStorage() {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getDoneRecipes) {
      const isRecipeDone = getDoneRecipes.some((recipe) => recipe.id === mealsId);
      setStatusControl({
        ...statusControl,
        isVisible: !isRecipeDone,
      });
    }
    if (getInProgressRecipes) {
      const isRecipeInProgress = Boolean(getInProgressRecipes.meals[mealsId]);
      setStatusControl({
        ...statusControl,
        isInProgress: isRecipeInProgress,
      });
    }
    if (getFavoriteRecipes) {
      const isRecipeFavorited = getFavoriteRecipes
        .some((recipe) => recipe.id === mealsId);
      setStatusControl({
        ...statusControl,
        isFavorited: isRecipeFavorited,
      });
    }
  }

  function handleStartRecipeButtonClick() {
    const { history } = props;
    history.push(`/comidas/${mealsId}/in-progress`);
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
    setFavoriteMealInLocalStorage(dataToManipulate);
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
        <img data-testid="recipe-photo" src={ strMealThumb } alt="" />
        {/* <div className="recipe-title"> */}
        {iconsRender()}
        {isLinkCopied && <p>Link copiado!</p>}
        {/* </div> */}
      </div>
      <div className="meal-name">
        <h1 className="title" data-testid="recipe-title">{strMeal}</h1>
        <h5 data-testid="recipe-category">{strCategory}</h5>
      </div>
      <ul className="links">
        <a href="#ingredients"><li>Ingredients</li></a>
        <a href="#instructions"><li>Instructions</li></a>
        <a href="#video"><li>Video</li></a>
        <a href="#recommendations"><li>Recommendations</li></a>
      </ul>
      <div id="ingredients" className="ingredients">
        <h4 className="ingredients-title">Ingredients</h4>
        <MapIngredients dataToManipulate={ dataToManipulate } />
      </div>
      <div id="instructions" className="instructions">
        <h4>Instructions</h4>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <div id="video" className="video">
        <h4>Video</h4>
        <iframe
          src={ `https://www.youtube.com/embed/${videoURL}` }
          title="video"
          frameBorder="0"
          data-testid="video"
        />
      </div>
      <div id="recommendations" className="recommendations">
        <h4>Recommendations</h4>
        <RecommendedBeverages beverages={ beverages } />
      </div>
      {isVisible && buttonRender()}
    </section>
  );
}

MealDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func }).isRequired,
};

export default withRouter(MealDetails);
