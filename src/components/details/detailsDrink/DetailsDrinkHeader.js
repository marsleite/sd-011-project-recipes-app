import React, { useContext } from 'react';
import RecipesContext from '../../../context/RecipesContext';

function DetailsDrinkHeader() {
  const { drinkId } = useContext(RecipesContext);
  return (
    <div className="details-header">
      <img
        src={ drinkId.strDrinkThumb }
        alt={ drinkId.strDrink }
        data-testid="recipe-photo"
      />
    </div>
  );
}

export default DetailsDrinkHeader;
