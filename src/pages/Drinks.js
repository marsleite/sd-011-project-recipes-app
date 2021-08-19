import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinkCategory, fetchDrinkList,
  fetchDrinkIngredientList, renderDrinkIngredient } from '../redux/actions/drinkActions';
import { DrinkCategories, Header, Footer, DrinkCard } from '../components';

class Drinks extends Component {
  componentDidMount() {
    const { actionFetchDrinkList, actionFetchCategories,
      actionFetchIngredientDrinkList, ingredientDrinkQuery,
      actionDrinkIngredient } = this.props;
    if (ingredientDrinkQuery === '') {
      actionFetchDrinkList('');
    } else {
      actionFetchIngredientDrinkList(ingredientDrinkQuery);
      actionDrinkIngredient('');
    }
    actionFetchCategories('list');
  }

  render() {
    const { drinkCardsList } = this.props;
    return (
      <div>
        <Header title="Bebidas" search />
        <DrinkCategories />
        <div className="card-list-container">
          { drinkCardsList.map((item, index) => (
            <DrinkCard key={ item.idDrink } drink={ item } index={ index } />)) }
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  drinkCardsList: state.drinkReducer.drinkCardsList,
  ingredientDrinkQuery: state.drinkReducer.ingredientDrinkQuery,
});

const mapDispatchToProps = (dispatch) => ({
  actionFetchDrinkList: (name) => dispatch(fetchDrinkList(name)),
  actionFetchCategories: (category) => dispatch(fetchDrinkCategory(category)),
  actionFetchIngredientDrinkList: (ingredient) => {
    dispatch(fetchDrinkIngredientList(ingredient));
  },
  actionDrinkIngredient: (ingredient) => dispatch(renderDrinkIngredient(ingredient)),
});

Drinks.propTypes = {
  actionFetchDrinkList: PropTypes.func,
  actionFetchCategories: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
