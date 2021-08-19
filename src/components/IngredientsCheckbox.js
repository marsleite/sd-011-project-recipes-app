import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../context';

export default function IngredientsCheckbox(props) {
  const { dataToManipulate } = props;
  const { setIsIngridientUsed, isIngridientUsed } = useContext(GlobalContext);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const urlLengthToGetId = 30;
  const restOfIdUrl = 35;
  const recipeId = window.location.href.slice(urlLengthToGetId, restOfIdUrl);

  const urlLengthToGetType = 22;
  const restOfTypeUrl = 29;
  const recipeType = window.location.href.slice(urlLengthToGetType, restOfTypeUrl);

  function getLocalStorage() {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(getStorage);
    if (getStorage) {
      const ingredientsArray = getStorage.meals[recipeId];
      return ingredientsArray || [];
    } return [];
  }

  function listIngredientsFromMeal() {
    const ingredientsInLocalStorage = getLocalStorage();
    const ingredients = [];
    const listOfControlledIngredients = {};
    const ingredientQuantity = Object.keys(dataToManipulate)
      .filter((key) => key.includes('strIngredient'));
    const ingredientMeasure = Object.keys(dataToManipulate)
      .filter((key) => key.includes('strMeasure'));
    ingredientQuantity.forEach((ingredient, index) => {
      if (dataToManipulate[ingredient] !== null && dataToManipulate[ingredient] !== '') {
        const isAlreadyUsed = ingredientsInLocalStorage
          .includes(dataToManipulate[ingredient]);
        listOfControlledIngredients[dataToManipulate[ingredient]] = isAlreadyUsed;
        ingredients.push({
          name: dataToManipulate[ingredient],
          quantity: dataToManipulate[ingredientMeasure[index]],
        });
      }
    });
    setIsIngridientUsed(listOfControlledIngredients);
    setRecipeIngredients(ingredients);
  }

  function handleCheckboxClick({ target }) {
    const { id } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setIsIngridientUsed({
      ...isIngridientUsed,
      [id]: value,
    });

    const previousProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (previousProgress !== null) {
      const usedIngredients = previousProgress.meals[recipeId];
      const includes = usedIngredients.includes(id);
      const deleteItem = usedIngredients.indexOf(id);

      switch (includes) {
      case false:
        usedIngredients.push(id);
        console.log(usedIngredients);
        localStorage.setItem('inProgressRecipes', JSON.stringify(previousProgress));
        break;
      default:
        usedIngredients.splice(deleteItem, 1);
        localStorage.setItem('inProgressRecipes', JSON.stringify(previousProgress));
        break;
      }
    } else if (recipeType === 'bebidas') {
      const newProgress = {
        cocktails: {
          [recipeId]: [id],
        },
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
    } else if (recipeType === 'comidas') {
      const newProgress = {
        cocktails: {},
        meals: {
          [recipeId]: [id],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
    }
  }

  useEffect(() => {
    listIngredientsFromMeal();
  }, [dataToManipulate]);

  return (
    <div>
      <form>
        {recipeIngredients.map(({ name, quantity }, ingredientIndex) => (
          <label
            key={ ingredientIndex }
            className={ isIngridientUsed[name] ? 'on' : 'off' }
            htmlFor={ name }
            data-testid={ `${ingredientIndex}-ingredient-step` }
          >
            <input
              checked={ isIngridientUsed[name] }
              id={ name }
              onChange={ handleCheckboxClick }
              type="checkbox"
            />
            {` ${name} - ${quantity}`}
          </label>
        ))}
      </form>
    </div>
  );
}

IngredientsCheckbox.propTypes = {
  dataToManipulate: PropTypes.objectOf(PropTypes.string).isRequired,
};
