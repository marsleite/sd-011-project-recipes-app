import React from 'react';
import HeaderDrink from '../components/HeaderDrink';
import CardRecipeListDrink from '../components/CardRecipeListDrink';
import Footer from '../components/Footer';
import NavCategories from '../components/NavCategories';

function drinkPage() {
  return (
    <div className="component-render-itens">
      <HeaderDrink title="Bebidas" search />
      <NavCategories origin="Drink" />
      <CardRecipeListDrink origin="Drink" />
      <Footer />
    </div>
  );
}

export default drinkPage;
