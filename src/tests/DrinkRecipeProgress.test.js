import React from 'react';
import { queryByTestId } from '@testing-library/react';
import { renderWithRouterAndStore } from './helper/testConfig';
import * as requestMenu from '../services/requestMenu';
import drinkRecipeDetails from './mocks/drinks/mockDrinkRecipeDetails';
import App from '../App';

jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(drinkRecipeDetails));

describe('Shouldnt have a <Header /> component at drink recipe progress screen', () => {
  it('Cant have a <Header /> component', () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas/15997/in-progress' });
    expect(queryByTestId(document.documentElement, 'profile-top-btn'))
      .not.toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'page-title'))
      .not.toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'search-top-btn'))
      .not.toBeInTheDocument();
  });
});
