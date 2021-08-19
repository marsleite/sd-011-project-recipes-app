import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import { testMealsRecipeCard, testDrinksRecipeCard } from '../helper/testRecipeCard';
import * as requestMenu from '../../services/requestMenu';
import App from '../../App';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';

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

describe('26 - Load the first 12 food recipes, one on each card',
  () => {
    it('Must load the first 12 food recipes', async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas' });
      const { meals } = mealsFiltersByAll;
      await testMealsRecipeCard(meals, maxDefaultCards, cardTestId, titleTestId);

      expect(screen.queryByTestId('12-recipe-card')).toBeNull();
      expect(screen.queryByTestId('12-recipe-img')).toBeNull();
      expect(screen.queryByTestId('12-recipe-name')).toBeNull();
    });

    it('Must load the first 12 drink recipes', async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas' });
      const { drinks } = drinksFiltersByAll;
      await testDrinksRecipeCard(drinks, maxDefaultCards, cardTestId, titleTestId);

      expect(screen.queryByTestId('12-recipe-card')).toBeNull();
      expect(screen.queryByTestId('12-recipe-img')).toBeNull();
      expect(screen.queryByTestId('12-recipe-name')).toBeNull();
    });
  });
