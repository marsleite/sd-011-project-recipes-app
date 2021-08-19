import React from 'react';
import ExploreRecipes from '../components/common/ExploreRecipes';
import Footer from '../components/common/Footer';

import Header from '../components/Header/Header';

const SearchDrinks = () => (
  <>
    <Header
      page="Explorar Bebidas"
      showSearchBtn={ false }
    />
    <ExploreRecipes page="bebidas" />
    <Footer />
  </>
);

export default SearchDrinks;
