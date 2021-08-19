import React from 'react';
import { queryByTestId } from '@testing-library/react';
import { renderWithRouterAndStore } from './helper/testConfig';
import * as requestMenu from '../services/requestMenu';
import mealRecipeDetails from './mocks/meals/mockMealRecipeDetails';
import App from '../App';

jest
  .spyOn(requestMenu, 'mealsRecipeDetails')
  .mockImplementation(() => Promise.resolve(mealRecipeDetails));

describe('Shouldnt have a <Header /> component at food recipe progress screen', () => {
  it('Cant have a <Header /> component', () => {
    renderWithRouterAndStore(<App />, { route: '/comidas/52977/in-progress' });
    expect(queryByTestId(document.documentElement, 'profile-top-btn'))
      .not.toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'page-title'))
      .not.toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'search-top-btn'))
      .not.toBeInTheDocument();
  });
});
