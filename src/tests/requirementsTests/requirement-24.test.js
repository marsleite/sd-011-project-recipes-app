import React from 'react';
import { screen, fireEvent, wait } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
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

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe('24 - Redirect the user to a food list by clicking on the food icon',
  () => {
    it('Redirects to correct route', async () => {
      const { history } = renderWithRouterAndStore(<App />, { route: '/bebidas' });

      fireEvent.click(await screen.findByTestId('food-bottom-btn'));

      const { location: { pathname } } = history;
      await wait(() => expect(pathname).toBe('/comidas'));
    });
  });
