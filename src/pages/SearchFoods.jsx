import React from 'react';
import ExploreRecipes from '../components/common/ExploreRecipes';
import Footer from '../components/common/Footer';

import Header from '../components/Header/Header';

const SearchFoods = () => (
  <>
    <Header
      page="Explorar Comidas"
      showSearchBtn={ false }
    />
    <ExploreRecipes page="comidas" />
    <Footer />
  </>
);

export default SearchFoods;
