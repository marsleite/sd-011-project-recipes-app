import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../../../context/RecipesContext';
import addToCheckedIngredient from './AddToCheckedIngredient';
import gettingIngredients from '../GettingIngredient';

function DetailsDrinkIngredientList() {
  const { drinkId, setAllIngredientsChecked } = useContext(RecipesContext);
  const [checkedNumberIngredients, setCheckedNumberIngredients] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const ingredients = gettingIngredients(drinkId);
  const checkPath = useLocation();
  const isInProgress = checkPath.pathname.includes('in-progress');
  const params = useParams();
  const urlID = params.id;

  useEffect(() => ((ingredients.length === checkedIngredients.length)
    ? setAllIngredientsChecked(false)
    : setAllIngredientsChecked(true)),
  [checkedIngredients, ingredients.length, setAllIngredientsChecked]);

  useEffect(() => {
    const localIngredient = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isInProgress) {
      if (!localIngredient) {
        const cocktails1 = { cocktails: {} };
        localStorage.setItem('inProgressRecipes', JSON.stringify(cocktails1));
      } else if (!localIngredient.cocktails) {
        const cocktails1 = { cocktails: { [urlID]: [] } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(cocktails1));
      } else if (localIngredient.cocktails[urlID]) {
        const test = localIngredient.cocktails[urlID];
        const filterIngredientLocalStorage = (
          ingredients.filter((_, index) => test.includes(index)));
        setCheckedNumberIngredients(test);
        setCheckedIngredients(filterIngredientLocalStorage);
      } else {
        const cocktails1 = { ...localIngredient,
          cocktails: { ...localIngredient.cocktails, [urlID]: [] } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(cocktails1));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stateParams = {
    checkedNumberIngredients,
    setCheckedNumberIngredients,
    checkedIngredients,
    setCheckedIngredients,
    urlID,
    recipeType: 'cocktails' };

  return (
    <div>
      <h4>Ingredientes</h4>
      <div>
        {!isInProgress
          ? (
            <ol>
              {
                ingredients.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { ingredient }
                  </li>
                ))
              }
            </ol>)
          : (
            <div>
              {
                ingredients.map((ingredient, index) => (
                  <>
                    <label
                      htmlFor={ `ingredient-${index}` }
                      data-testid={ `${index}-ingredient-step` }
                      key={ index }
                    >
                      <input
                        type="checkbox"
                        id={ `ingredient-${index}` }
                        name={ index }
                        value={ ingredient }
                        onChange={ () => addToCheckedIngredient(ingredient,
                          index, stateParams) }
                        defaultChecked={ checkedIngredients.includes(ingredient) }
                      />
                      { (checkedIngredients.includes(ingredient))
                        ? <del>{ ingredient }</del> : ingredient }
                    </label>
                    <br />
                  </>
                ))
              }
            </div>
          ) }
      </div>
    </div>
  );
}

export default DetailsDrinkIngredientList;
