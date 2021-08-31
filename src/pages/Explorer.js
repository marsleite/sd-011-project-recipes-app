import React from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import '../styles/components/explorer.css';
import explorer from '../images/explorer.svg';

export default function Explorer() {
  const pageTitle = {
    pageName: 'Explorar',
    setIcon: false,
  };
  return (
    <>
      <Header value={ pageTitle } />
      <div className="explorer-style">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            name="Explorar Comidas"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            name="Explorar bebidas"
          >
            Explorar Bebidas
          </button>
        </Link>
        <img src={ explorer } alt="Explorar" />
      </div>
      <FooterMenu />
    </>
  );
}
