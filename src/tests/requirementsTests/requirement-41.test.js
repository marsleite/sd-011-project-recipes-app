import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

const mockMealPath = '/comidas/52977';
const mockDrinkPath = '/bebidas/15997';

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

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});
beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe(`41 - Redirect the user person if the "Iniciar Receita" button is clicked, the 
route should change to the recipe in process screen`, () => {
  it('Redirects to food recipe screen in process', async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: mockMealPath });

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    fireEvent.click(startRecipeBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas/52977/in-progress');
  });

  it('Redirects to drink recipe screen in process', async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: mockDrinkPath });

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    fireEvent.click(startRecipeBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas/15997/in-progress');
  });
});
