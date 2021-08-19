/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  requestDrinkMenu,
  requestDrinksFilters,
  requestDrinksByFilter,
} from '../redux/actions/menuReducerActions';
import {
  fetchDrinksIngredient,
  fetchDrinksByName,
  fetchDrinksByFirstLetter,
} from '../redux/actions/IngredientsApiAction';
import FilterMenu from '../components/FilterMenu';
import Footer from '../components/common/Footer';
import Header from '../components/Header/Header';
import RecipeCard from '../components/common/RecipeCard';

const Drinks = ({
  dispatch,
  error,
  loadingFilterOptions,
  categoryNames,
  loadingDrinks,
  drinks,
  drinkId,
}) => {
  const { location: { state } } = useHistory();

  useEffect(() => {
    dispatch(requestDrinksFilters());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      dispatch(requestDrinkMenu());
    }
  }, [error, dispatch]);

  return (
    <>
      <nav>
        <Header
          page="Bebidas"
          showSearchBtn
          recipe={ drinks }
          recipeId={ drinkId }
          redirectTo="bebidas"
          fetchIngredients={ fetchDrinksIngredient }
          fetchByName={ fetchDrinksByName }
          fetchByFirstLetter={ fetchDrinksByFirstLetter }
        />
        {
          (loadingFilterOptions)
            ? (<div>Loading...</div>)
            : (
              <FilterMenu
                requestMenu={
                  (state) ? fetchDrinksIngredient : requestDrinkMenu
                }
                exploreByIngredient={
                  (state) ? state.recipeName : null
                }
                categoryNames={ categoryNames }
                filterByCategory={ requestDrinksByFilter }
              />
            )
        }
      </nav>
      <main>
        {
          (loadingDrinks)
            ? (<div>Loading...</div>)
            : (
              drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
                <RecipeCard
                  key={ index }
                  cardType="bebida"
                  cardTestId="-recipe-card"
                  index={ index }
                  recipeId={ idDrink }
                  recipeThumb={ strDrinkThumb }
                  recipeName={ strDrink }
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
  drinks: state.menuReducer.menu,
  drinkId: state.menuReducer.drinkId,
  loadingDrinks: state.menuReducer.isLoading,
  error: state.menuReducer.error,
});

Drinks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadingFilterOptions: PropTypes.bool.isRequired,
  categoryNames: PropTypes.arrayOf(PropTypes.string),
  loadingDrinks: PropTypes.bool.isRequired,
  error: PropTypes.string,
  drinks: PropTypes.arrayOf(PropTypes.object),
  drinkId: PropTypes.string,
};

Drinks.defaultProps = {
  categoryNames: [],
  drinks: [],
  error: null,
  drinkId: undefined,
};

export default connect(mapStateToProps)(Drinks);
