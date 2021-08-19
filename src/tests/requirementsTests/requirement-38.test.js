import React from 'react';
import { screen, wait } from '@testing-library/react';
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

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`38 - Develop a button named "Start Recipe" that should stay fixed at the 
bottom of the screen at all times`, () => {
  it('Check button placement on food details screen', async () => {
    renderWithRouterAndStore(<App />, { route: mockMealPath });

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');

    await wait(() => expect(startRecipeBtn).toHaveStyle('position: fixed'));
    await wait(() => expect(startRecipeBtn).toHaveStyle('bottom: 0px'));
  });

  it('Check button placement on drink details screen', async () => {
    renderWithRouterAndStore(<App />, { route: mockDrinkPath });

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');

    await wait(() => expect(startRecipeBtn).toHaveStyle('position: fixed'));
    await wait(() => expect(startRecipeBtn).toHaveStyle('bottom: 0px'));
  });
});
