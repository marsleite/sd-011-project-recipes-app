import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import GlobalContext from '../context';
import '../styles/Comidas.css';

function FoodCard(props) {
  const { history } = props;
  const { foodArray, loading } = useContext(GlobalContext);

  if (foodArray && foodArray.length === 1) {
    const id = foodArray[0].idMeal;
    history.push(`/comidas/${id}`);
  }

  function goToRecipeDetails({ target }) {
    const { id } = target;
    history.push(`/comidas/${id}`);
  }

  return (
    <section className="card-list">
      {foodArray && foodArray.length ? foodArray.map((meal, index) => (
        <div
          className="card"
          data-testid={ `${index}-recipe-card` }
          id={ meal.idMeal }
          key={ index }
          onClick={ goToRecipeDetails }
          onKeyUp={ goToRecipeDetails }
          role="button"
          tabIndex={ index }
        >
          <img
            alt=""
            data-testid={ `${index}-card-img` }
            id={ meal.idMeal }
            src={ meal.strMealThumb }
          />
          <span
            data-testid={ `${index}-card-name` }
            id={ meal.idMeal }
          >
            {meal.strMeal}
          </span>
        </div>
      )) : <span className="loading" />}
    </section>
  );
}

FoodCard.propTypes = {
  history: PropTypes.instanceOf(PropTypes.array).isRequired,
};

export default withRouter(FoodCard);
