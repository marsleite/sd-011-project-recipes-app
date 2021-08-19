import React from 'react';
import { queryByTestId } from '@testing-library/react';
import { renderWithRouterAndStore } from './helper/testConfig';
import * as requestMenu from '../services/requestMenu';
import drinkRecipeDetails from './mocks/drinks/mockDrinkRecipeDetails';
import App from '../App';

jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(drinkRecipeDetails));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe('Should not have a <Header /> component in the Drink Details screen', () => {
  it('Cant have a <Header /> component', () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas/15997' });
    expect(queryByTestId(document.documentElement, 'profile-top-btn'))
      .not.toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'page-title'))
      .not.toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'search-top-btn'))
      .not.toBeInTheDocument();
  });
});
