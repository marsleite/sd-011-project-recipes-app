import React from 'react';
import { screen } from '@testing-library/react';
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

describe(`19 - Implement the elements of the lower menu respecting the attributes
described in the prototype`, () => {
  it(`There are footer, drinks-bottom-btn, explore-bottom-btn and food-bottom-btn
  data-testids`, async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    expect(await screen.findByTestId('footer')).toBeInTheDocument();
    expect(await screen.findByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('food-bottom-btn')).toBeInTheDocument();
  });
});
