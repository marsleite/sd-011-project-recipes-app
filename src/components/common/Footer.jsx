import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const Footer = () => (
  <footer data-testid="footer" style={ { position: 'fixed', bottom: '0' } }>
    <Link
      to="/bebidas"
    >
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink Icon" />
    </Link>
    <Link
      to="/explorar"
    >
      <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Search Icon" />
    </Link>
    <Link
      to="/comidas"
    >
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="Food Icon" />
    </Link>
  </footer>
);

export default Footer;
