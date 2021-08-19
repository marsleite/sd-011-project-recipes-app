import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!localStorage.doneRecipes) {
      localStorage.setItem('doneRecipes', '[]');
    }
    const doneRecipes = JSON.parse(localStorage.doneRecipes);
    if (filter === 'all') {
      setRecipes(doneRecipes);
    } else {
      const filterRecipes = doneRecipes.filter((element) => element.type === filter);
      setRecipes(filterRecipes);
    }
  }, [filter]);

  return (
    <div>
      <Header title="Receitas Feitas" />
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
          className="border"
          variant="light"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('bebida') }
        >
          Drinks
        </Button>
      </div>
      <div className=" d-flex flex-column align-items-center px-3">
        {
          (recipes.length > 0) ? recipes.map((element, index) => (
            <DoneRecipeCard recipe={ element } key={ index } index={ index } />))
            : <h2>Nenhuma Receita feita</h2>
        }
      </div>

    </div>
  );
}
