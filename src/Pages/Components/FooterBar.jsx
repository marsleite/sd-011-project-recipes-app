import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.png';
import exploreIcon from '../../images/exploreIcon.png';
import foodIcon from '../../images/foodIcon.png';
import '../../styles/footerBar.css';

export default function FooterBar() {
  return (
    <div
      style={ { position: 'fixed', bottom: 0 } }
      className="col-12 bg-white d-flex justify-content-between"
      data-testid="footer"
    >
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          width="50px"
          style={ { padding: '2px' } }
          src={ drinkIcon }
          alt="ícone de bebidas"
        />
      </Link>
      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          width="50px"
          style={ { padding: '2px' } }
          src={ exploreIcon }
          alt="ícone de explorar - bulsola"
        />
      </Link>
      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          width="50px"
          style={ { padding: '2px' } }
          src={ foodIcon }
          alt="ícone de comidas - garfos"
        />
      </Link>
    </div>
  );
}
