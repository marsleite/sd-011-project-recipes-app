import React from 'react';
import HeaderFood from '../components/HeaderFood';

function favoriteRecipe() {
  return (
    <div>
      <HeaderFood title="Receitas Favoritas" search={ false } />
      Receitas favoritas
    </div>
  );
}

export default favoriteRecipe;
