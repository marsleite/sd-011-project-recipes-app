import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderFood from '../components/HeaderFood';

function Explore() {
  return (
    <div>
      <HeaderFood title="Explorar" search={ false } />
      <Link to="/explorar/comidas">
        <button
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
