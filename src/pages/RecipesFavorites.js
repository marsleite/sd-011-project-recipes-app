import React, { useState } from 'react';
import Header from '../components/Header';
import DoneFavRecipesCard from '../components/DoneFavRecipesCard';

function RecipesFavorites() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  const handleFilterButtons = (event) => {
    const { innerText } = event.target;
    if (innerText === 'Food') {
      setFilteredRecipes(favoriteRecipes.filter(({ type }) => type === 'comida'));
    }
    if (innerText === 'Drinks') {
      setFilteredRecipes(favoriteRecipes.filter(({ type }) => type === 'bebida'));
    }
    if (innerText === 'All') {
      setFilteredRecipes(favoriteRecipes);
    }
  };

  const removeFromFavorites = (id) => {
    const newFavorites = favoriteRecipes.filter((favRecipe) => favRecipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFilteredRecipes(newFavorites);
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <nav>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilterButtons }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFilterButtons }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilterButtons }
        >
          Drinks
        </button>
      </nav>
      <div>
        { filteredRecipes.map((recipe, index) => (
          <DoneFavRecipesCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
            removeFromFavorites={ removeFromFavorites }
            fav
          />
        )) }
      </div>
    </div>
  );
}

export default RecipesFavorites;
