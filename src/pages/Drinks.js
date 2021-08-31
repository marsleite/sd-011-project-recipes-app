import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinkCategory, fetchDrinkRecommanded } from '../services/DrinksApiServices';
import '../styles/components/cards.css';
import '../styles/components/category.css';

export default function Drinks() {
  const pageTitle = {
    pageName: 'Bebidas',
    setIcon: true,
  };

  const [firstDrink, setFirstDrink] = useState([]);
  const [categoriesDrink, setCategoriesDrink] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const response = async () => {
      const data = await fetchDrinkRecommanded();
      return setFirstDrink(data);
    };
    response();
  }, []);

  useEffect(() => {
    const response = async () => {
      const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const dataList = await data.json();
      return setCategoriesDrink(dataList.drinks);
    };
    response();
  }, []);

  const {
    recipesDb,
    redirect,
    setRecipesDb,
  } = useContext(RecipesContext);

  function functionAll() {
    return setRecipesDb(firstDrink);
  }

  async function handleFetchByCategory(param) {
    const cat = await fetchDrinkCategory(param);
    return setRecipesDb(cat);
  }

  const history = useHistory();
  const limits = 12;
  const limitCategory = 5;

  function handleDrinks() {
    if (recipesDb.length === 0) {
      return (
        <div className="card-container">
          {
            firstDrink.map((drink, index) => (
              (index < limits) && (
                <Link to={ `/bebidas/${drink.idDrink}` } key={ `${index}-recipe-card` }>
                  <div className="card-style">
                    <div className="card-img" data-testid={ `${index}-recipe-card` }>
                      <img
                        src={ drink.strDrinkThumb }
                        data-testid={ `${index}-card-img` }
                        alt={ drink.strDrink }
                      />
                    </div>
                    <div className="card-title">
                      <span data-testid={ `${index}-card-name` }>{ drink.strDrink }</span>
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
          recipesDb.map((drink, index) => (
            (index < limits) && (
              <Link to={ `/bebidas/${drink.idDrink}` } key={ `${index}-recipe-card` }>
                <div className="card-style">
                  <div className="card-img" data-testid={ `${index}-recipe-card` }>
                    <img
                      src={ drink.strDrinkThumb }
                      data-testid={ `${index}-card-img` }
                      alt={ drink.strDrink }
                    />
                  </div>
                  <div className="card-title">
                    <span data-testid={ `${index}-card-name` }>{ drink.strDrink }</span>
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
        { categoriesDrink.map((category, index) => ((index < limitCategory
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
        ? history.push(`/bebidas/${recipesDb.map((drink) => drink.idDrink)}`)
        : handleDrinks() }
      <FooterMenu />
    </div>
  );
}
