import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { testMealsRecipeCard, testDrinksRecipeCard } from '../helper/testRecipeCard';
import { mockFilterDrinkByCategory, mockFilterMealByCategory } from '../helper/mockAPI';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import mealsFilterByBeef from '../mocks/meals/mockFilterByBeef';
import drinksFilterByOrdinaryDrink from '../mocks/drinks/mockFilterByOrdinaryDrink';
import * as requestMenu from '../../services/requestMenu';
import App from '../../App';

const maxDefaultCards = 12;
const cardTestId = '-recipe-card';
const titleTestId = '-card-name';

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

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe('31 - Develop the category filter with the option to filter by all categories',
  () => {
    it('If the recipes are for food, there must be an option to filter by all categories',
      async () => {
        renderWithRouterAndStore(<App />, { route: '/comidas' });
        mockFilterMealByCategory(mealsFilterByBeef);

        const beefFilterOption = await screen.findByTestId('Beef-category-filter');
        fireEvent.click(beefFilterOption);

        const { meals: mealsOptions } = mealsFilterByBeef;
        await testMealsRecipeCard(mealsOptions, maxDefaultCards, cardTestId, titleTestId);

        const allFilterOption = await screen.findByTestId('All-category-filter');
        fireEvent.click(allFilterOption);

        const { meals: allOptions } = mealsFiltersByAll;
        await testMealsRecipeCard(allOptions, maxDefaultCards, cardTestId, titleTestId);
      });

    it(`If the recipes are for drinks, there must be the option to filter by all 
    categories`, async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas' });
      mockFilterDrinkByCategory(drinksFilterByOrdinaryDrink);

      const ordinaryDrinkFilterOption = await screen.findByTestId(
        'Ordinary Drink-category-filter',
      );
      fireEvent.click(ordinaryDrinkFilterOption);

      const { drinks: orinaryDrinksOptions } = drinksFilterByOrdinaryDrink;
      await testDrinksRecipeCard(
        orinaryDrinksOptions, maxDefaultCards, cardTestId, titleTestId,
      );

      const allFilterOption = await screen.findByTestId('All-category-filter');
      fireEvent.click(allFilterOption);

      const { drinks: allOptions } = drinksFiltersByAll;
      await testDrinksRecipeCard(
        allOptions, maxDefaultCards, cardTestId, titleTestId,
      );
    });
  });
