import Header from '../Components/Header';
import Footer from '../Components/Footer';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RecipesFoods.css';

export default function ExploreFoodIngredients() {

const [foodIngredients, setFoodIngredients] = useState([]);
const [setMealsAndDrinkByIngredients] = useState([]);
const numberOfIngredients = 12;
const showMaxRecipes = 12;

useEffect(() => {
  const getIngredients = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const { meals } = await fetch(endpoint).then((data) => data.json());
    setFoodIngredients(meals);
  };
  getIngredients();
}, []);

const getRecipesByIngredient = async (param) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());

};

const getTwelveIngredients = () => {
  const twelveIngredients = foodIngredients
    .filter((ingredient, index) => index < numberOfIngredients);
  return (
    twelveIngredients.map((ingredient, index) => {
      const name = ingredient.strIngredient;
      return (
        <div className='cardlist'>
          <Link
            to="/comidas"
            key={ index }
            className="ingredient"
            data-testid={ `${index}-ingredient-card` }
            onClick={ (e) => getRecipesByIngredient(e.target.innerText || e.target.alt) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${name}-Small.png` }
              alt={ name }
              className='foodimg'
            />
            <p
              data-testid={ `${index}-card-name` }
              className="ingredient-title"
            >
              { name }
            </p>
          </Link>
        </div> 
      );
    })
  );
};
return (
  <div>
    <Header />
    <main className="main-ingredients">
      <section className="ingredients-container cardlist">
        { getTwelveIngredients() }
      </section>
    </main>
    <Footer />
  </div>
);
}