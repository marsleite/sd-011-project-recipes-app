import React, { useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipesFilter from '../components/FavoriteRecipesFilter';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import '../styles/FavoritesRecipes.css';

export default function FavoriteRecipes() {
  const [recipeTypeFilter, setRecipeTypeFilter] = useState();

  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    try {
      const favorites = localStorage.getItem('favoriteRecipes');
      return JSON.parse(favorites).filter((item) => Boolean(item.id));
    } catch (error) {
      return [];
    }
  });

  function handleLikeButtonClick(recipe) {
    const nextFavoriteRecipes = favoriteRecipes.filter((item) => item !== recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(nextFavoriteRecipes));
    setFavoriteRecipes(nextFavoriteRecipes);
  }

  const filteredRecipes = recipeTypeFilter
    ? favoriteRecipes.filter((item) => item.type === recipeTypeFilter)
    : favoriteRecipes;

  return (
    <div>
      <Header title="Receitas Favoritas" renderButton />
      <FavoriteRecipesFilter
        onChange={ setRecipeTypeFilter }
      />
      <div className="favorites-cards">
        {filteredRecipes.map((recipe, index) => (<FavoriteRecipeCard
          isFavorited
          index={ index }
          key={ recipe.id }
          recipe={ recipe }
          handleLikeButtonClick={ () => handleLikeButtonClick(recipe) }
        />))}
      </div>
    </div>
  );
}
