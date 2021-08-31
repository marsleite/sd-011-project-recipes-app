import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/components/footer.css';

export default function FooterMenu() {
  const history = useHistory();
  return (
    <footer className="footer-menu" data-testid="footer">
      <button
        className="button-footer"
        type="button"
        onClick={ () => history.push('/bebidas') }
      >
        <img
          src={ drinkIcon }
          alt="botão de drinks"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        className="button-footer"
        type="button"
        onClick={ () => history.push('/explorar') }
      >
        <img
          src={ exploreIcon }
          alt="explorar"
          data-testid="explore-bottom-btn"
        />
      </button>
      <button
        className="button-footer"
        type="button"
        onClick={ () => history.push('/comidas') }
      >
        <img
          src={ mealIcon }
          alt="explorar"
          data-testid="food-bottom-btn"
        />
      </button>
    </footer>
  );
}
