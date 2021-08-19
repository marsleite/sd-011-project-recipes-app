import React, { useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipesFilter from '../components/FavoriteRecipesFilter';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function DoneRecipes() {
  const [recipeTypeFilter, setRecipeTypeFilter] = useState();

  const [doneRecipes, setFavoriteRecipes] = useState(() => {
    try {
      const dones = localStorage.getItem('doneRecipes');
      return JSON.parse(dones).filter((item) => Boolean(item.id));
    } catch (error) {
      return [];
    }
  });

  function handleLikeButtonClick(recipe) {
    const nextFavoriteRecipes = doneRecipes.filter((item) => item !== recipe);
    localStorage.setItem('doneRecipes', JSON.stringify(nextFavoriteRecipes));
    setFavoriteRecipes(nextFavoriteRecipes);
  }

  const filteredRecipes = recipeTypeFilter
    ? doneRecipes.filter((item) => item.type === recipeTypeFilter)
    : doneRecipes;

  return (
    <>
      <Header title="Receitas Feitas" renderButton />
      <FavoriteRecipesFilter
        onChange={ setRecipeTypeFilter }
      />
      <div className="done-recipes">
        {filteredRecipes.map((recipe, index) => (<DoneRecipeCard
          isFavorited
          index={ index }
          key={ recipe.id }
          recipe={ recipe }
          handleLikeButtonClick={ () => handleLikeButtonClick(recipe) }
        />))}
      </div>
    </>
  );
}
