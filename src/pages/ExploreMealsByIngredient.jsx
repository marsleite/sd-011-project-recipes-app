import React, { useEffect, useState } from 'react';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import IngredientCard from '../components/ingredientcard/IngredientCard';

export default function ExploreMealsByIngredient() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    (async function fetchIngredients() {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const request = await fetch(url);
      const data = await request.json();

      const numberMaxOfItems = 12;
      setIngredients(data.meals.splice(0, numberMaxOfItems));
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
            ingredient={ ingredient.strIngredient }
            mealOrCocktail="meal"
            index={ index }
            path="/comidas"
          />
        ))
      }
      <Footer />
    </div>
  );
}
