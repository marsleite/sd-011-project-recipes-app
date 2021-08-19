import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
});

afterEach(() => {
  localStorage.clear();
});

describe(`60 - Implement the elements of the favorite recipes screen (cumulative with
  the attributes in common with the made recipes screen) respecting the attributes
  described in the prototype`, () => {
  it(`All data-testids, cumulative with attributes in common with the recipes made
  screen, are available`, async () => {
    renderWithRouterAndStore(<App />, { route: '/receitas-favoritas' });

    expect(await screen.findByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(await screen.findByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(await screen.findByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(await screen.findByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();
  });
});
