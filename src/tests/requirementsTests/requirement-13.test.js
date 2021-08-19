import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
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

describe(`13 - Implement the search bar elements respecting the attributes described in
the prototype`, () => {
  it('It has the data-testids for both the search bar and all radio-buttons',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas' });

      expect(await screen.findByTestId('search-top-btn')).toBeInTheDocument();
      fireEvent.click(await screen.findByTestId('search-top-btn'));

      expect(await screen.findByTestId('search-input')).toBeInTheDocument();
      expect(await screen.findByTestId('ingredient-search-radio')).toBeInTheDocument();
      expect(await screen.findByTestId('name-search-radio')).toBeInTheDocument();
      expect(await screen.findByTestId('first-letter-search-radio')).toBeInTheDocument();
      expect(await screen.findByTestId('exec-search-btn')).toBeInTheDocument();
    });
});
