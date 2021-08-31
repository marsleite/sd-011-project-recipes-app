import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchMealsLetter, fetchMealsCategory } from '../services/MealApiService';
import '../styles/components/cards.css';
import '../styles/components/category.css';

export default function Food() {
  const pageTitle = {
    pageName: 'Comidas',
    setIcon: true,
  };

  const [firstFood, setFirstFood] = useState([]);
  const [categoriesFood, setCategoriesFood] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const response = async () => {
      const data = await fetchMealsLetter('c');
      return setFirstFood(data);
    };
    response();
  }, []);

  useEffect(() => {
    const response = async () => {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const dataList = await data.json();
      return setCategoriesFood(dataList.meals);
    };
    response();
  }, []);

  const {
    recipesDb,
    redirect,
    setRecipesDb,
  } = useContext(RecipesContext);

  async function handleFetchByCategory(param) {
    const cat = await fetchMealsCategory(param);
    return setRecipesDb(cat);
  }

  function functionAll() {
    // const data = await fetchMealsLetter('c');
    return setRecipesDb(firstFood);
  }

  const history = useHistory();
  const limits = 12;
  const limitCategory = 5;

  function handleMeals() {
    if (recipesDb.length === 0) {
      return (
        <div className="card-container">
          {
            firstFood.map((meal, index) => (
              (index < limits) && (
                <Link to={ `/comidas/${meal.idMeal}` } key={ `${index}-recipe-card` }>
                  <div className="card-style">
                    <div className="card-img" data-testid={ `${index}-recipe-card` }>
                      <img
                        src={ meal.strMealThumb }
                        data-testid={ `${index}-card-img` }
                        alt={ meal.strMeal }
                      />
                    </div>
                    <div className="card-title">
                      <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
                    </div>
                  </div>
                </Link>
              )
            ))
          }
        </div>
      );
    }
    return (
      <div className="card-container">
        {
          recipesDb.map((meal, index) => (
            (index < limits) && (
              <Link to={ `/comidas/${meal.idMeal}` } key={ `${index}-recipe-card` }>
                <div className="card-style">
                  <div className="card-img" data-testid={ `${index}-recipe-card` }>
                    <img
                      src={ meal.strMealThumb }
                      data-testid={ `${index}-card-img` }
                      alt={ meal.strMeal }
                    />
                  </div>
                  <div className="card-title">
                    <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
                  </div>
                </div>
              </Link>
            )
          ))
        }
      </div>
    );
  }

  return (
    <div>
      <Header value={ pageTitle } />
      <div className="category-container">
        <button
          type="button"
          onClick={ () => functionAll() }
          data-testid="All-category-filter"
        >
          All
        </button>
        { categoriesFood.map((category, index) => ((index < limitCategory
        ) && (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            name={ category.strCategory }
            onClick={ ({ target }) => {
              setRecipesDb([]);
              setSelectedCategory(target.name);
              if (selectedCategory === target.name && toggle === false) {
                setToggle(true);
                functionAll();
              } else {
                setToggle(false);
                handleFetchByCategory(target.name);
              }
            } }
          >
            {category.strCategory}
          </button>)
        ))}
      </div>
      { redirect
        ? history.push(`/comidas/${recipesDb.map((meal) => meal.idMeal)}`)
        : handleMeals()}
      <FooterMenu />
    </div>
  );
}
