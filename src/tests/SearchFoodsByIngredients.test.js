import React from 'react';
import { screen } from '@testing-library/react';
import SearchFoodsByIngredients from '../pages/SearchFoodsByIngredients';

import { renderWithRouterAndStore } from './helper/testConfig';

describe('Tests SearchFoodsByIngredients Page', () => {
  const searchFoodsByIngredientsRoute = '/explorar/bebidas';
  it('Checks if Footer is rendered', () => {
    renderWithRouterAndStore(<SearchFoodsByIngredients />, searchFoodsByIngredientsRoute);
    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });
  it('Checks if drinkIcon is rendered', () => {
    renderWithRouterAndStore(<SearchFoodsByIngredients />, searchFoodsByIngredientsRoute);
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
  });
  it('Checks if searchIcon is rendered', () => {
    renderWithRouterAndStore(<SearchFoodsByIngredients />, searchFoodsByIngredientsRoute);
    const searchButton = screen.getByTestId('explore-bottom-btn');
    expect(searchButton).toBeInTheDocument();
  });
  it('Checks if foodIcon is rendered', () => {
    renderWithRouterAndStore(<SearchFoodsByIngredients />, searchFoodsByIngredientsRoute);
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });
});
