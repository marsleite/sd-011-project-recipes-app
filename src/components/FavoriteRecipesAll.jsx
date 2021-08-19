import React, { useState } from 'react';
import '../styles/components/filterMenu.css';

const FavoriteRecipesAll = () => {
  const [allFavorited, setAllFavorited] = useState([]);
  console.log(allFavorited);

  const renderAllFavorited = () => {
    const getAllFavorites = JSON.parse(localStorage.favoriteRecipes);
    setAllFavorited(getAllFavorites);
  };

  return (
    <>
      <nav>
        <button
          type="button"
          onClick={ renderAllFavorited }
        >
          All
        </button>
      </nav>
      <section>
        { allFavorited }
      </section>
    </>
  );
};

export default FavoriteRecipesAll;
