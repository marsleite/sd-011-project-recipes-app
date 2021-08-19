import React from 'react';
import { Switch, Route } from 'react-router';
import {
  Login,
  Foods,
  Drinks,
  FoodDetails,
  DrinkDetails,
  FoodRecipeProgress,
  DrinkRecipeProgress,
  Search,
  SearchFoods,
  SearchDrinks,
  SearchFoodsByIngredients,
  SearchDrinksByIngredients,
  SearchFoodsByLocal,
  Profile,
  FavoriteRecipes,
  CompletedRecipes,
} from '../pages';
import NotFound from '../components/NotFound';

const Routes = () => (
  <Switch>
    <Route
      path="/explorar/bebidas/ingredientes"
      component={ SearchDrinksByIngredients }
    />
    <Route path="/explorar/comidas/ingredientes" component={ SearchFoodsByIngredients } />
    <Route path="/bebidas/:id/in-progress" component={ DrinkRecipeProgress } />
    <Route path="/comidas/:id/in-progress" component={ FoodRecipeProgress } />
    <Route path="/explorar/bebidas/area" component={ NotFound } />
    <Route path="/explorar/comidas/area" component={ SearchFoodsByLocal } />
    <Route path="/explorar/bebidas" component={ SearchDrinks } />
    <Route path="/explorar/comidas" component={ SearchFoods } />
    <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    <Route path="/receitas-feitas" component={ CompletedRecipes } />
    <Route path="/bebidas/:id" component={ DrinkDetails } />
    <Route path="/comidas/:id" component={ FoodDetails } />
    <Route path="/explorar" component={ Search } />
    <Route path="/bebidas" component={ Drinks } />
    <Route path="/comidas" component={ Foods } />
    <Route path="/perfil" component={ Profile } />
    <Route exact path="/" component={ Login } />
  </Switch>
);

export default Routes;
