import React from 'react';
import { screen, wait } from '@testing-library/react';
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

describe(`20 - Fix the lower menu and display 3 icons: one for food, one for drinks and
one for exploration`, () => {
  it('The lower menu must always be fixed to the bottom of the page', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    const footer = await screen.findByTestId('footer');

    await wait(() => expect(footer).toHaveStyle('position: fixed'));
    await wait(() => expect(footer).toHaveStyle('bottom: 0px'));
  });

  it('Display the correct icons', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    const drinksBottomBtn = await screen.findByTestId('drinks-bottom-btn');
    const exploreBottomBtn = await screen.findByTestId('explore-bottom-btn');
    const foodBottomBtn = await screen.findByTestId('food-bottom-btn');

    expect(drinksBottomBtn).toHaveAttribute(
      'src', expect.stringContaining('drinkIcon'),
    );
    expect(exploreBottomBtn).toHaveAttribute(
      'src', expect.stringContaining('exploreIcon'),
    );
    expect(foodBottomBtn).toHaveAttribute(
      'src', expect.stringContaining('mealIcon'),
    );
  });
});
