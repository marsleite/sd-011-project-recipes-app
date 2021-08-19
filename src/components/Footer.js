import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import './css/Footer.css';

import {
  FooterContainer,
  Button,
  Icon,
} from './styles/FooterAndHeader';

function Footer() {
  return (
    <FooterContainer className="footer" data-testid="footer">
      <Link to="/bebidas">
        <Button type="button" src={ drinkIcon } data-testid="drinks-bottom-btn">
          <Icon src={ drinkIcon } alt="Drink" />
        </Button>
      </Link>
      <Link to="/explorar">
        <Button type="button" src={ exploreIcon } data-testid="explore-bottom-btn">
          <Icon src={ exploreIcon } alt="Explorar" />
        </Button>
      </Link>
      <Link to="/comidas">
        <Button
          type="button"
          src={ mealIcon }
          data-testid="food-bottom-btn"
        >
          <Icon src={ mealIcon } alt="Comidas" />
        </Button>
      </Link>
    </FooterContainer>
  );
}

export default Footer;
