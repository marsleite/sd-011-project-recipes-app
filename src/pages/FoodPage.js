import React from 'react';
import HeaderFood from '../components/HeaderFood';
import CardRecipeListFood from '../components/CardRecipeListFood';
import Footer from '../components/Footer';
import NavCategories from '../components/NavCategories';

function foodPage() {
  return (
    <div className="component-render-itens">
      <HeaderFood title="Comidas" search />
      <NavCategories origin="Food" />
      <CardRecipeListFood origin="Food" />
      <Footer />
    </div>
  );
}

export default foodPage;
