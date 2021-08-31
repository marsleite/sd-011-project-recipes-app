import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Food from './pages/Food';
import Drinks from './pages/Drinks';
import FoodsExplorer from './pages/FoodsExplorer';
import DoneRecipes from './pages/DoneRecipes';
import DrinksExplorer from './pages/DrinksExplorer';
import Explorer from './pages/Explorer';
import FavouriteReciples from './pages/FavouriteRecipes';
import FoodsByLocal from './pages/FoodsByLocal';
import ExploreFoodByIngredients from './pages/ExploreFoodByIngredients';
import Profile from './pages/Profile';
import MealsDetails from './pages/MealsDetails';
import DrinksDetails from './pages/DrinksDetails';
import ExploreDrinkByIngredients from './pages/ExploreDrinkByIngredients';
import InProgressMeal from './pages/InProgressMeal';
import InProgressDrink from './pages/InProgressDrink';
import NotFound from './pages/NotFound';

function App() {
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Food } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/explorar/comidas" component={ FoodsExplorer } />
          <Route exact path="/receitas-feitas" component={ DoneRecipes } />
          <Route exact path="/explorar/bebidas" component={ DrinksExplorer } />
          <Route exact path="/explorar" component={ Explorer } />
          <Route exact path="/receitas-favoritas" component={ FavouriteReciples } />
          <Route exact path="/explorar/comidas/area" component={ FoodsByLocal } />
          <Route exact path="/explorar/bebidas/area" component={ NotFound } />
          <Route exact path="/comidas/:id" component={ MealsDetails } />
          <Route exact path="/bebidas/:id" component={ DrinksDetails } />
          <Route exact path="/comidas/:id/in-progress" component={ InProgressMeal } />
          <Route exact path="/bebidas/:id/in-progress" component={ InProgressDrink } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodByIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinkByIngredients }
          />
          <Route exact path="/perfil" component={ Profile } />
        </Switch>
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default App;
