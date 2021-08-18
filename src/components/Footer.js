import React from 'react';
import { Link } from 'react-router-dom';

import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';

import '../styles/footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="component-footer">
      <Link to="/bebidas">
        <button type="button">
          <img
            src={ DrinkIcon }
            alt="drink icon"
            width="30px"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <img
            src={ ExploreIcon }
            alt="explore icon"
            width="30px"
            data-testid="explore-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button">
          <img
            src={ MealIcon }
            alt="food icon"
            width="30px"
            data-testid="food-bottom-btn"
          />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
