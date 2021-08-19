import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';

export default function FavouriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', '[]');
    }
    const localStore = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (filter === 'all') {
      setRecipes(localStore);
    } else {
      const filterRecipes = localStore.filter((element) => element.type === filter);
      setRecipes(filterRecipes);
    }
  }, [filter]);
  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="btn-group d-flex flex-wrap mb-3">
        <Button
          variant="light"
          className="border"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </Button>
        <Button
          variant="light"
          className="border"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('comida') }
        >
          Food
        </Button>
        <Button
          variant="light"
          className="border"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Drinks
        </Button>
      </div>
      <div className=" d-flex flex-column align-items-center px-3">
        { (recipes.length > 0) ? recipes.map((element, index) => (
          <FavoriteCard recipe={ element } index={ index } key={ index } />
        )) : <h1>Nenhuma Favorita</h1> }
      </div>
    </div>
  );
}
