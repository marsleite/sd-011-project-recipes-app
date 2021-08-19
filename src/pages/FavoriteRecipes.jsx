import React, { useState, useEffect } from 'react';

import Header from '../components/Header/Header';
import FavoriteButton from '../components/common/HeaderDetails/FavoriteButton';
import FavoriteRecipesAll from '../components/FavoriteRecipesAll';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  console.log(favoriteRecipes);

  useEffect(() => {
    const favoritedStore = localStorage.favoriteRecipes;
    if (favoritedStore) {
      setFavoriteRecipes(JSON.parse(favoritedStore));
    }
  }, []);

  return (
    <>
      <Header
        page="Receitas Favoritas"
        showSearchBtn={ false }
      />
      <FavoriteRecipesAll />
      <div>Receitas Favoritas</div>
      <FavoriteButton />
    </>
  );
};

export default FavoriteRecipes;
