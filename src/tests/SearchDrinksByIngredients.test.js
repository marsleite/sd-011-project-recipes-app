import React from 'react';
import { screen } from '@testing-library/react';
import SearchDrinksByIngredients from '../pages/SearchFoodsByIngredients';

import { renderWithRouterAndStore as renderWith } from './helper/testConfig';

describe('Tests SearchFoodsByIngredients Page', () => {
  const searchDrinksByIngredientsRoute = '/explorar/bebidas';
  it('Checks if Footer is rendered', () => {
    renderWith(<SearchDrinksByIngredients />, searchDrinksByIngredientsRoute);
    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });
  it('Checks if drinkIcon is rendered', () => {
    renderWith(<SearchDrinksByIngredients />, searchDrinksByIngredientsRoute);
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
  });
  it('Checks if searchIcon is rendered', () => {
    renderWith(<SearchDrinksByIngredients />, searchDrinksByIngredientsRoute);
    const searchButton = screen.getByTestId('explore-bottom-btn');
    expect(searchButton).toBeInTheDocument();
  });
  it('Checks if foodIcon is rendered', () => {
    renderWith(<SearchDrinksByIngredients />, searchDrinksByIngredientsRoute);
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });
});
