import React from 'react';
import HeaderFood from '../components/HeaderFood';
import Clipboard2 from '../components/Clipboard2';

function finishRecipe() {
  return (
    <div>
      <HeaderFood title="Receitas Feitas" search={ false } />
      Receitas feitas
      <Clipboard2 />
    </div>
  );
}

export default finishRecipe;
