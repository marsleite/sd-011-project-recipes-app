import React from 'react';
import { screen } from '@testing-library/react';
import Drinks from '../pages/Drinks';

import { renderWithRouterAndStore } from './helper/testConfig';

describe('Verify if the Header component have the atributs data-testid', () => {
  it('Have data-testid "profile-top-btn"', () => {
    renderWithRouterAndStore(<Drinks />, '/comidas');
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });

  it('Have data-testid "page-title"', () => {
    renderWithRouterAndStore(<Drinks />, '/comidas');
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  it('Have data-testid "search-top-btn"', () => {
    renderWithRouterAndStore(<Drinks />, '/comidas');
    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
  });
});

describe('Tests Drinks Page', () => {
  it('Checks if Footer is rendered', () => {
    renderWithRouterAndStore(<Drinks />, '/bebidas');
    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });
  it('Checks if drinkIcon is rendered', () => {
    renderWithRouterAndStore(<Drinks />, '/bebidas');
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
  });
  it('Checks if searchIcon is rendered', () => {
    renderWithRouterAndStore(<Drinks />, '/bebidas');
    const searchButton = screen.getByTestId('explore-bottom-btn');
    expect(searchButton).toBeInTheDocument();
  });
  it('Checks if foodIcon is rendered', () => {
    renderWithRouterAndStore(<Drinks />, '/bebidas');
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });
});
