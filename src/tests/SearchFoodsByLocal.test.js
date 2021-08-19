import React from 'react';
import { queryByTestId, screen } from '@testing-library/react';
import SearchFoodsByLocal from '../pages/SearchFoodsByLocal';

import { renderWithRouterAndStore } from './helper/testConfig';

describe('Should have the right icon in the screen search foods by local', () => {
  it('Should have the profile, search buttons and title', () => {
    renderWithRouterAndStore(<SearchFoodsByLocal />);
    expect(queryByTestId(document.documentElement, 'profile-top-btn'))
      .toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'page-title'))
      .toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'search-top-btn'))
      .toBeInTheDocument();
  });
});

describe('Tests SearchFoodsByLocal Page', () => {
  const searchFoodsByLocalRoute = '/explorar/comidas/area';
  it('Checks if Footer is rendered', () => {
    renderWithRouterAndStore(<SearchFoodsByLocal />, searchFoodsByLocalRoute);
    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });
  it('Checks if drinkIcon is rendered', () => {
    renderWithRouterAndStore(<SearchFoodsByLocal />, searchFoodsByLocalRoute);
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
  });
  it('Checks if searchIcon is rendered', () => {
    renderWithRouterAndStore(<SearchFoodsByLocal />, searchFoodsByLocalRoute);
    const searchButton = screen.getByTestId('explore-bottom-btn');
    expect(searchButton).toBeInTheDocument();
  });
  it('Checks if foodIcon is rendered', () => {
    renderWithRouterAndStore(<SearchFoodsByLocal />, searchFoodsByLocalRoute);
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });
});
