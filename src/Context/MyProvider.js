import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function MyProvider({ children }) {
  const [recipe, setRecipe] = useState({ meals: [], drinks: [] });
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [search, setSearch] = useState([]);
  const [recFood, setRecFood] = useState([]);
  const [recDrink, setRecDrink] = useState([]);
  const [cards, setCards] = useState([]);
  const [favoriteRecipes, setFavRecipes] = useState(() => {
    const favRecipe = localStorage.getItem('favoriteRecipes');
    return favRecipe ? JSON.parse(favRecipe) : [];
  });
  const [recomendations, setRecomendations] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userEmailProfile, setUserEmailProfile] = useState('');
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [setFoodArea, foodArea] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [mealsAndDrinkByIngredients, setMealsAndDrinkByIngredients] = useState([]);



  const context = {
    foodIngredients,
    setFoodIngredients,
    setFoodArea,
    foodArea,
    mealsAndDrinkByIngredients,
    setMealsAndDrinkByIngredients,
    drinkIngredients,
    setDrinkIngredients,
    userEmailProfile,
    setUserEmailProfile,    
    recipe,
    setRecipe,
    recFood,
    setRecFood,
    recDrink,
    setRecDrink,
    cards,
    setCards,
    favoriteRecipes,
    setFavRecipes,
    recomendations,
    setRecomendations,
    setIsFavorite,
    isFavorite,
    food,
    setFood,
    drink,
    setDrink,
    search,
    setSearch,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
