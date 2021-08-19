import React from 'react';
import { screen, queryByTestId } from '@testing-library/react';
import Search from '../pages/Search';

import { renderWithRouterAndStore } from './helper/testConfig';

describe('Should have the right icons on the search screen', () => {
  it('Should have a profile button and "Explorar" title', () => {
    renderWithRouterAndStore(<Search />);
    expect(queryByTestId(document.documentElement, 'profile-top-btn'))
      .toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'page-title'))
      .toBeInTheDocument();
  });
  it('shouldnt have a search button', () => {
    renderWithRouterAndStore(<Search />);
    expect(queryByTestId(document.documentElement, 'search-top-btn'))
      .not.toBeInTheDocument();
  });
});

describe('Tests Search Page', () => {
  it('Checks if Footer is rendered', () => {
    renderWithRouterAndStore(<Search />, '/explorar');
    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });
  it('Checks if drinkIcon is rendered', () => {
    renderWithRouterAndStore(<Search />, '/explorar');
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
  });
  it('Checks if searchIcon is rendered', () => {
    renderWithRouterAndStore(<Search />, '/explorar');
    const searchButton = screen.getByTestId('explore-bottom-btn');
    expect(searchButton).toBeInTheDocument();
  });
  it('Checks if foodIcon is rendered', () => {
    renderWithRouterAndStore(<Search />, '/explorar');
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });
});
