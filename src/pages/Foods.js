import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFoodCategory, fetchFoodList,
  fetchFoodIngredientList, renderFoodIngredient } from '../redux/actions/foodActions';
import { FoodCard, FoodCategories, Header, Footer } from '../components';

class Foods extends Component {
  componentDidMount() {
    const { actionFetchFoodList, actionFetchCategories,
      ingredientQuery, actionFetchIngredientFoodList,
      actionFoodIngredient } = this.props;
    if (ingredientQuery === '') {
      actionFetchFoodList('');
    } else {
      actionFetchIngredientFoodList(ingredientQuery);
      actionFoodIngredient('');
    }
    actionFetchCategories('list');
  }

  render() {
    const { foodCardsList } = this.props;
    return (
      <main className="foods">
        <Header title="Comidas" search />
        <FoodCategories />
        <div className="card-list-container">
          { foodCardsList.map((item, index) => (
            <FoodCard key={ item.idMeal } food={ item } index={ index } />)) }
        </div>
        <Footer />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  foodCardsList: state.foodReducer.foodCardsList,
  ingredientQuery: state.foodReducer.ingredientFoodQuery,
});

const mapDispatchToProps = (dispatch) => ({
  actionFetchFoodList: (name) => dispatch(fetchFoodList(name)),
  actionFetchCategories: (category) => dispatch(fetchFoodCategory(category)),
  actionFetchIngredientFoodList: (ingredient) => {
    dispatch(fetchFoodIngredientList(ingredient));
  },
  actionFoodIngredient: (ingredient) => dispatch(renderFoodIngredient(ingredient)),
});

Foods.propTypes = {
  actionFetchFoodList: PropTypes.func,
  actionFetchCategories: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
