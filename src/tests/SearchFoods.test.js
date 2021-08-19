import React from 'react';
import { screen, queryByTestId } from '@testing-library/react';
import SearchFoods from '../pages/SearchFoods';

import { renderWithRouterAndStore } from './helper/testConfig';

describe('Screen search foods should have Header component', () => {
  it('Should have a profile button and "Explorar Comidas" title', () => {
    renderWithRouterAndStore(<SearchFoods />);
    expect(queryByTestId(document.documentElement, 'profile-top-btn'))
      .toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'page-title'))
      .toBeInTheDocument();
  });

  it('Shouldnt have a search button', () => {
    renderWithRouterAndStore(<SearchFoods />);
    expect(queryByTestId(document.documentElement, 'search-top-btn'))
      .not.toBeInTheDocument();
  });
});

describe('Tests SearchFoods Page', () => {
  const searchFoodsRoute = '/explorar/comidas';
  it('Checks if Footer is rendered', () => {
    renderWithRouterAndStore(<SearchFoods />, searchFoodsRoute);
    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });
  it('Checks if drinkIcon is rendered', () => {
    renderWithRouterAndStore(<SearchFoods />, searchFoodsRoute);
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
  });
  it('Checks if searchIcon is rendered', () => {
    renderWithRouterAndStore(<SearchFoods />, searchFoodsRoute);
    const searchButton = screen.getByTestId('explore-bottom-btn');
    expect(searchButton).toBeInTheDocument();
  });
  it('Checks if foodIcon is rendered', () => {
    renderWithRouterAndStore(<SearchFoods />, searchFoodsRoute);
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });
});
