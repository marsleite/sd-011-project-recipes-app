import React from 'react';
import HeaderFood from '../components/HeaderFood';
import ButtonShare from '../components/ButtonShare';

function favoriteRecipe() {
  return (
    <div>
      <HeaderFood title="Receitas Favoritas" search={ false } />
      <ButtonShare dataId="0-horizontal-share-btn" />
    </div>
  );
}

export default favoriteRecipe;
