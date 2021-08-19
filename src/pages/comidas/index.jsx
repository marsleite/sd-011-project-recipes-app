import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import * as actions from '../../actions';

const TWELVE = 12;
const FIVE = 5;
class Comidas extends Component {
  componentDidMount() {
    const { generalRecipesFood, categoriesFood } = this.props;
    generalRecipesFood();
    categoriesFood();
  }

  handleOnClickFilter(element) {
    const { filteredFoods, generalRecipesFood } = this.props;
    if (element.target.checked === true) {
      filteredFoods(element.target.value);
    } else {
      generalRecipesFood();
    }
  }

  renderFilters() {
    let { allCategories } = this.props;
    const { generalRecipesFood } = this.props;
    allCategories = allCategories.slice(0, FIVE);

    return [
      <button
        key="All-btn"
        data-testid="All-category-filter"
        className="filter-btn"
        type="button"
        value="All"
        onClick={ generalRecipesFood }
      >
        All
      </button>,

      ...allCategories.map((item, index) => (
        <label
          className="switch"
          key={ `${item}${index}` }
          htmlFor="id"
        >
          <input
            id="id"
            className="filter-toggle"
            type="checkbox"
            value={ item.strCategory }
            data-testid={ `${item.strCategory}-category-filter` }
            onChange={ (element) => this.handleOnClickFilter(element) }
          />
          {item.strCategory}
          <span className="slider round" />
        </label>
      )),
    ];
  }

  renderFoods() {
    const { allRecipes, isFiltered, isRecipeFilter, recipesByIngredient } = this.props;
    const allRecipesSlice = allRecipes.slice(0, TWELVE);
    if (allRecipesSlice.length === 1 && !isFiltered) {
      return (
        <Redirect to={ `/comidas/${allRecipesSlice[0].idMeal}` } />
      );
    }
    const recipes = !isRecipeFilter ? allRecipesSlice : recipesByIngredient;
    return recipes.map((item, index) => (
      <Link to={ `/comidas/${item.idMeal}` } key={ `${item}${index}` }>
        <div
          className="card-item"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            className="img-card"
            alt={ item.strMeal }
            src={ item.strMealThumb }
            data-testid={ `${index}-card-img` }
          />
          <div>
            <span
              data-testid={ `${index}-card-name` }
            >
              {item.strMeal}
            </span>
          </div>
        </div>
      </Link>
    ));
  }

  render() {
    return (
      <>
        <Header title="Comidas" mode="comidas" hasSearchBar />
        <div className="container-main">
          <div className="filter-list">
            {this.renderFilters()}
          </div>
          <div className="card-list">
            {this.renderFoods()}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  allRecipes: state.recipes.allRecipes,
  allCategories: state.recipes.allCategories,
  isFiltered: state.recipes.isFiltered,
  recipesByIngredient: state.recipes.recipesByIngredient,
  isRecipeFilter: state.recipes.isRecipeFilter,
});

const mapDispatchToProps = (dispatch) => ({
  generalRecipesFood: () => dispatch(actions.generalRecipesFood()),
  categoriesFood: () => dispatch(actions.categoriesFood()),
  filteredFoods: (filter) => dispatch(actions.filteredFoods(filter)),
});

Comidas.propTypes = {
  allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  generalRecipesFood: PropTypes.func.isRequired,
  categoriesFood: PropTypes.func.isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredFoods: PropTypes.func.isRequired,
  isFiltered: PropTypes.arrayOf(PropTypes.bool).isRequired,
  recipesByIngredient: PropTypes.arrayOf(PropTypes.object).isRequired,
  isRecipeFilter: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
