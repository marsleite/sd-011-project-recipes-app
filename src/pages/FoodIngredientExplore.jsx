import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useIngredients from '../hooks/useIngredients';

export default function FoodIngredientExplore() {
  const { renderCards } = useIngredients('meal');

  return (
    <div>
      <Header title="Explorar Ingredientes de Comidas" />
      { renderCards() }
      <Footer />
    </div>
  );
}
