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

const searchInputTestId = 'search-input';
const searchTopBtnTestId = 'search-top-btn';

describe(`12 - Develop the search button that, when clicked, the search bar should
appear. The same goes to hide it`, () => {
  it('When clicking the search button for the first time the search bar appears',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas' });

      const searchInput = screen.queryByTestId(searchInputTestId);

      expect(searchInput).toBeNull();

      const searchTopBtn = await screen.findByTestId(searchTopBtnTestId);
      fireEvent.click(searchTopBtn);

      expect(await screen.findByTestId(searchInputTestId)).toBeInTheDocument();
    });

  it('By clicking the search button a second time the search bar disappears',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas' });

      const searchTopBtn = await screen.findByTestId(searchTopBtnTestId);
      fireEvent.click(searchTopBtn);

      expect(await screen.findByTestId(searchInputTestId)).toBeInTheDocument();

      fireEvent.click(searchTopBtn);
      expect(screen.queryByTestId(searchInputTestId)).toBeNull();
    });
});
