import React from 'react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { testMealsRecipeCard, testDrinksRecipeCard } from '../helper/testRecipeCard';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

const maxDefaultCards = 6;
const cardTestId = '-recomendation-card';
const titleTestId = '-recomendation-title';

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

describe(`37 - Implement the recommendation cards, which will be 6 cards, but showing 
only 2 and the scroll is horizontal, similar to a carousel`, () => {
  it('Checks if there are any recommendations in the details screen of a food',
    async () => {
      renderWithRouterAndStore(<App />, { route: mockMealPath });

      const { drinks } = drinksFiltersByAll;
      await testDrinksRecipeCard(drinks, maxDefaultCards, cardTestId, titleTestId);
    });

  it('Check if there are any recommendations in the details screen of a drink',
    async () => {
      renderWithRouterAndStore(<App />, { route: mockDrinkPath });

      const { meals } = mealsFiltersByAll;
      await testMealsRecipeCard(meals, maxDefaultCards, cardTestId, titleTestId);
    });
});
