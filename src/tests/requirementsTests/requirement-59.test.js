import React from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

jest
  .spyOn(requestMenu, 'searchDrinkByName')
  .mockImplementation(() => Promise.resolve(drinksFiltersByAll));

jest
  .spyOn(requestMenu, 'mealsRecipeDetails')
  .mockImplementation(() => Promise.resolve(mealRecipeDetails));

jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(drinkRecipeDetails));

const doneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
});

afterEach(() => {
  localStorage.clear();
});

describe(`59 - Redirect to the recipe details screen if clicked on the picture or recipe
name`, () => {
  it(`By clicking on the recipe photo, the route should change to that recipe's details
  screen`, async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/receitas-feitas' });

    fireEvent.click(await screen.findByTestId('0-horizontal-image'));

    const { location: { pathname } } = history;
    await wait(() => expect(pathname).toBe('/comidas/52771'));
  });

  it(`By clicking on the name of the recipe, the route should change to the details screen
  for that recipe.`, async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/receitas-feitas' });

    fireEvent.click(await screen.findByTestId('1-horizontal-name'));

    const { location: { pathname } } = history;
    await wait(() => expect(pathname).toBe('/bebidas/178319'));
  });
});
