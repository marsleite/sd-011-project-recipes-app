import React from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css';
import cocktail from '../images/cocktail.png';
import compass from '../images/compass.png';
import meal from '../images/meal.png';

import {
  FooterContainer,
  Button,
  Icon,
} from './styles/FooterAndHeader';

function Footer() {
  return (
    <FooterContainer className="footer" data-testid="footer">
      <Link to="/bebidas">
        <Button type="button" src={ cocktail } data-testid="drinks-bottom-btn">
          <Icon src={ cocktail } alt="Drink" />
        </Button>
      </Link>
      <Link to="/explorar">
        <Button type="button" src={ compass } data-testid="explore-bottom-btn">
          <Icon src={ compass } alt="Explorar" />
        </Button>
      </Link>
      <Link to="/comidas">
        <Button
          type="button"
          src={ meal }
          data-testid="food-bottom-btn"
        >
          <Icon src={ meal } alt="Comidas" />
        </Button>
      </Link>
    </FooterContainer>
  );
}

export default Footer;
