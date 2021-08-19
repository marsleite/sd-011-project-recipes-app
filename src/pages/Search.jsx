import React from 'react';
import '../styles/pages/search.css';
import { Link } from 'react-router-dom';
import Footer from '../components/common/Footer';

import Header from '../components/Header/Header';

const Search = () => (
  <>
    <Header
      page="Explorar"
      showSearchBtn={ false }
    />
    <main className="explore-recipes">
      <Link data-testid="explore-food" to="/explorar/comidas">
        Explorar Comidas
      </Link>
      <Link data-testid="explore-drinks" to="/explorar/bebidas">
        Explorar Bebidas
      </Link>
    </main>
    <Footer />
  </>
);

export default Search;
