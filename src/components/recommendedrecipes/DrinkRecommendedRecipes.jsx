import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export default function MealRecommendedRecipes() {
  const history = useHistory();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    (async function fetchCategory() {
      const quantity = 6;
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(url);
      const data = await request.json();
      setRecommended(data.drinks.splice(0, quantity));
    }());
  }, []);

  return (
    <div>
      {
        recommended
        && recommended.map((recomendation, index) => (
          <button
            type="button"
            key={ index }
            onClick={ () => history.push(`/comidas/${recomendation.idDrink}`) }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ recomendation.strDrinkThumb } alt={ recomendation.strDrink } />
            <h3>{recomendation.strDrink}</h3>
          </button>
        ))
      }
    </div>
  );
}
