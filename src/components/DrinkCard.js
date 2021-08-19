import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import GlobalContext from '../context';
import '../styles/Comidas.css';

function DrinkCard(props) {
  const { history } = props;
  const { drinkArray, loading } = useContext(GlobalContext);

  if (drinkArray && drinkArray.length === 1) {
    const id = drinkArray[0].idDrink;
    history.push(`/bebidas/${id}`);
  }

  function goToRecipeDetails({ target }) {
    const { id } = target;
    history.push(`/bebidas/${id}`);
  }

  return (
    <section className="card-list">
      {drinkArray && drinkArray.length ? drinkArray.map((drink, index) => (
        <div
          className="card"
          data-testid={ `${index}-recipe-card` }
          id={ drink.idDrink }
          key={ index }
          onClick={ goToRecipeDetails }
          onKeyUp={ goToRecipeDetails }
          role="button"
          tabIndex={ index }
        >
          <img
            alt=""
            data-testid={ `${index}-card-img` }
            id={ drink.idDrink }
            src={ drink.strDrinkThumb }
          />
          <span
            data-testid={ `${index}-card-name` }
            id={ drink.idDrink }
          >
            {drink.strDrink}
          </span>
        </div>
      )) : <span className="loading" />}
    </section>
  );
}

DrinkCard.propTypes = {
  history: PropTypes.instanceOf(PropTypes.array).isRequired,
};

export default withRouter(DrinkCard);
