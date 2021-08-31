import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';

function DetailsHeader() {
  const { mealId } = useContext(RecipesContext);
  return (
    <div className="details-header">
      <img
        src={ mealId.strMealThumb }
        alt={ mealId.strMeal }
        data-testid="recipe-photo"
      />
    </div>
  );
}

export default DetailsHeader;
