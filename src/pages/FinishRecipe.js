import React from 'react';
import HeaderFood from '../components/HeaderFood';

function finishRecipe() {
  return (
    <div>
      <HeaderFood title="Receitas Feitas" search={ false } />
      Receitas feitas
    </div>
  );
}

export default finishRecipe;
