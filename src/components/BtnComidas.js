import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Explorar.css';

export default function BtnComidas() {
  const [idProduto, setIdProduto] = useState({});

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setIdProduto(data.meals[0]));
  });

  return (
    <div className="explore-btns-container">
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="explorar-btn explore-food-btn medium-font"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
          className="explorar-btn explore-food-btn medium-font"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${idProduto.idMeal}` }>
        <button
          type="button"
          data-testid="explore-surprise"
          className="explorar-btn explore-food-btn medium-font"
        >
          Me Surpreenda!
        </button>
      </Link>

    </div>
  );
}
