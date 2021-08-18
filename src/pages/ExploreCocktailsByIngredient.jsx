import React, { useEffect, useState } from 'react';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import IngredientCard from '../components/ingredientcard/IngredientCard';

export default function ExploreCocktailsByIngredient() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    (async function fetchIngredients() {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const request = await fetch(url);
      const data = await request.json();

      const numberMaxOfItems = 12;
      setIngredients(data.drinks.splice(0, numberMaxOfItems));
    }());
  }, []);

  return (
    <div>
      <Header pageTitle="Explorar Ingredientes" itHasNotSearchButton />
      {
        ingredients
        && ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ index }
            ingredient={ ingredient.strIngredient1 }
            mealOrCocktail="cocktail"
            index={ index }
            path="/bebidas"
          />
        ))
      }
      <Footer />
    </div>
  );
}
