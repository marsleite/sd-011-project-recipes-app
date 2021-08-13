import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function FoodCarrossel({ recomendation }) {
  const history = useHistory();
  const [recomendations, setRecomendations] = useState();

  useEffect(() => {
    setRecomendations(recomendation);
    console.log(recomendation);
  }, [recomendation]);

  function imgClickHandler(id) {
    history.push(`/bebidas/${id}`);
    window.location.reload();
  }

  function renderMealCarrossel() {
    return (
      <div>
        <h3>Recomendações:</h3>
        <div className="container-carrossel">
          { recomendations ? recomendations
            .map((item, index) => (
              <button
                data-testid={ `${index}-recomendation-card` }
                key={ index }
                type="button"
                onClick={ () => imgClickHandler(item.idDrink) }
              >
                <img
                  alt="logo"
                  src={ item.strDrinkThumb }
                  width="140px"
                />
                <h3 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h3>
              </button>
            )) : 'loading'}
        </div>
      </div>
    );
  }

  return (
    recomendation ? renderMealCarrossel() : 'loading...'
  );
}

export default FoodCarrossel;
