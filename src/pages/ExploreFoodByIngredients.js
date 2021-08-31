import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { getIngredients, fetchMealsIngredient } from '../services/MealApiService';

export default function ExploreFoodByIngredients() {
  const pageTitle = {
    pageName: 'Explorar Ingredientes',
    setIcon: false,
  };
  const [ingredients, setIngredients] = useState([]);
  const { setRecipesDb } = useContext(RecipesContext);
  const history = useHistory();
  const limits = 12;
  useEffect(() => {
    const fetchIngredients = async () => {
      const fetchedIngredients = await getIngredients();
      return setIngredients(fetchedIngredients);
    };
    fetchIngredients();
  }, []);

  async function getMealFromIngredient(param) {
    const data = await fetchMealsIngredient(param);
    setRecipesDb([]);
    return setRecipesDb(data);
  }

  return (
    <div>
      <Header value={ pageTitle } />
      <div className="card-container">
        {
          ingredients.map((meal, index) => (
            (index < limits) && (
              <button
                key={ index }
                name={ meal.strIngredient }
                type="button"
                onClick={ ({ target }) => {
                  getMealFromIngredient(target.getAttribute('name'));
                  return history.push('/comidas');
                } }
              >
                <div className="card-style">
                  <div className="card-img" data-testid={ `${index}-ingredient-card` }>
                    <img
                      name={ meal.strIngredient }
                      src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
                      data-testid={ `${index}-card-img` }
                      alt={ meal.strIngredient }
                    />
                  </div>
                  <div name={ meal.strIngredient } className="card-title">
                    <span
                      data-testid={ `${index}-card-name` }
                    >
                      { meal.strIngredient }
                    </span>
                  </div>
                </div>
              </button>
            )
          ))
        }
      </div>
      <FooterMenu />
    </div>
  );
}
