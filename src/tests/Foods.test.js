import React from 'react';
import {
  screen,
  fireEvent,
  queryByTestId,
} from '@testing-library/react';
import { renderWithRouterAndStore } from './helper/testConfig';

import App from '../App';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';

describe('Should have the right data-testid properties', () => {
  it('Should have a data-testid="ingredient-search-radio" propertie', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    fireEvent.click(await screen.findByTestId(searchTopBtn));
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
  });

  it('Should have a data-testid="ingredient-search-radio" propertie', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    fireEvent.click(await screen.findByTestId(searchTopBtn));
    const nameRadio = screen.getByTestId('name-search-radio');

    expect(nameRadio).toBeInTheDocument();
  });
  it('Should have a data-testid="first-letter-search-radio" propertie', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    fireEvent.click(await screen.findByTestId(searchTopBtn));
    const letterRadio = screen.getByTestId('first-letter-search-radio');

    expect(letterRadio).toBeInTheDocument();
  });
  it('Should have a data-testid="exec-search-btn" propertie', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    fireEvent.click(await screen.findByTestId(searchTopBtn));
    const searchButton = screen.getByTestId('exec-search-btn');

    expect(searchButton).toBeInTheDocument();
  });
});

describe('Testing Header component functionalities', () => {
  it('When click on the profile button render Profile', () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/comidas' });
    const profileButton = screen.getByTestId('profile-top-btn');

    fireEvent.click(profileButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/perfil');
  });

  it('Show and hide when click on search button', () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const searchButton = screen.getByTestId(searchTopBtn);

    expect(searchButton).toBeInTheDocument();

    expect(queryByTestId(document.documentElement, searchInput)).toBe(null);
    fireEvent.click(searchButton);
    expect(queryByTestId(document.documentElement, searchInput)).toBeInTheDocument();
  });
});

describe('Verify if the Header component have the atributs data-testid', () => {
  it('Have data-testid "profile-top-btn"', () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });

  it('Have data-testid "page-title"', () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  it('Have data-testid "search-top-btn"', () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const searchButton = screen.getByTestId(searchTopBtn);
    expect(searchButton).toBeInTheDocument();
  });
});

describe('Tests Foods Page', () => {
  it('Checks if Footer is rendered', () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });
  it('Checks if drinkIcon is rendered', () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
  });
  it('Checks if searchIcon is rendered', () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const searchButton = screen.getByTestId('explore-bottom-btn');
    expect(searchButton).toBeInTheDocument();
  });
  it('Checks if foodIcon is rendered', () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });
});
