/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  requestMealsMenu,
  requestMealsFilters,
  requestMealsByFilter,
} from '../redux/actions/menuReducerActions';
import {
  fetchIngredients,
  fetchByName,
  fetchByFirstLetter,
} from '../redux/actions/IngredientsApiAction';

import FilterMenu from '../components/FilterMenu';
import Footer from '../components/common/Footer';
import Header from '../components/Header/Header';
import RecipeCard from '../components/common/RecipeCard';

const Foods = ({
  dispatch,
  error,
  loadingFilterOptions,
  categoryNames,
  loadingMeals,
  meals,
  mealId,
}) => {
  const { location: { state } } = useHistory();

  useEffect(() => {
    dispatch(requestMealsFilters());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      dispatch(requestMealsMenu());
    }
  }, [error, dispatch]);

  return (
    <>
      <nav>
        <Header
          page="Comidas"
          showSearchBtn
          recipe={ meals }
          recipeId={ mealId }
          redirectTo="comidas"
          fetchIngredients={ fetchIngredients }
          fetchByName={ fetchByName }
          fetchByFirstLetter={ fetchByFirstLetter }
        />
        {
          (loadingFilterOptions)
            ? (<div>Loading...</div>)
            : (
              <FilterMenu
                requestMenu={
                  (state) ? fetchIngredients : requestMealsMenu
                }
                exploreByIngredient={
                  (state) ? state.recipeName : null
                }
                categoryNames={ categoryNames }
                filterByCategory={ requestMealsByFilter }
              />
            )
        }
      </nav>
      <main>
        {
          (loadingMeals)
            ? (<div>Loading...</div>)
            : (
              meals.map(({ idMeal, strMeal, strMealThumb }, index) => (
                <RecipeCard
                  key={ index }
                  index={ index }
                  cardType="comida"
                  cardTestId="-recipe-card"
                  recipeId={ idMeal }
                  recipeThumb={ strMealThumb }
                  recipeName={ strMeal }
                  titleTestId="-card-name"
                />
              ))
            )
        }
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  loadingFilterOptions: state.menuReducer.filters.isLoading,
  categoryNames: state.menuReducer.filters.options,
  meals: state.menuReducer.menu,
  mealId: state.menuReducer.mealId,
  loadingMeals: state.menuReducer.isLoading,
  error: state.menuReducer.error,
});

Foods.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadingFilterOptions: PropTypes.bool.isRequired,
  categoryNames: PropTypes.arrayOf(PropTypes.string),
  loadingMeals: PropTypes.bool.isRequired,
  error: PropTypes.string,
  meals: PropTypes.arrayOf(PropTypes.object),
  mealId: PropTypes.string,
};

Foods.defaultProps = {
  categoryNames: [],
  meals: [],
  error: null,
  mealId: undefined,
};

export default connect(mapStateToProps)(Foods);
