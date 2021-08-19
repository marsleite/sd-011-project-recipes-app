import React, { useState } from 'react';
import '../../styles/pages/search.css';
import { string } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

const ExploreRecipes = ({ page }) => {
  const { push } = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setSurprise = () => {
    setLoading(true);
    if (page === 'comidas') {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then(({ meals }) => push(`/comidas/${meals[0].idMeal}`))
        .catch(() => setError('404'));
    }

    if (page === 'bebidas') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then(({ drinks }) => push(`/bebidas/${drinks[0].idDrink}`))
        .catch(() => setError('404'));
    }
  };

  if (error) {
    return <div>Erro</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="explore-recipes">
      <Link data-testid="explore-by-ingredient" to={ `/explorar/${page}/ingredientes` }>
        Por Ingredientes
      </Link>
      {
        (page === 'comidas')
          ? (
            <Link data-testid="explore-by-area" to="/explorar/comidas/area">
              Por Local de Origem
            </Link>
          )
          : null
      }
      <button
        data-testid="explore-surprise"
        onClick={ () => setSurprise() }
        type="button"
      >
        Me Surpreenda!
      </button>
    </nav>
  );
};

ExploreRecipes.propTypes = {
  page: string,
}.isRequired;

export default ExploreRecipes;
