import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import * as requestMenu from '../../services/requestMenu';
import App from '../../App';

jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

jest
  .spyOn(requestMenu, 'requestAllMealCategories')
  .mockImplementation(() => Promise.resolve(mealsFiltersOptions));

jest
  .spyOn(requestMenu, 'searchDrinkByName')
  .mockImplementation(() => Promise.resolve(drinksFiltersByAll));

jest
  .spyOn(requestMenu, 'requestAllDrinkCategories')
  .mockImplementation(() => Promise.resolve(drinksFiltersOptions));

jest
  .spyOn(requestMenu, 'mealsRecipeDetails')
  .mockImplementation(() => Promise.resolve(mealRecipeDetails));

jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(drinkRecipeDetails));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`32 - Redirect the user, by clicking on the card, to the details screen, which 
should change the route and contain the recipe id in the URL`, () => {
  it('If the recipes are for food, the route should change to the recipe details screen',
    async () => {
      const { history } = renderWithRouterAndStore(<App />, { route: '/comidas' });

      const firstFoodCard = await screen.findByTestId('0-recipe-card');
      fireEvent.click(firstFoodCard);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/comidas/52977');
    });

  it(`If the recipes are for drinks, the route should change to the recipe details 
  screen`, async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/bebidas' });

    const firstDrinkCard = await screen.findByTestId('0-recipe-card');
    fireEvent.click(firstDrinkCard);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas/15997');
  });
});
