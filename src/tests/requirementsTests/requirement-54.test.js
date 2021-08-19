import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

const doneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
});

afterEach(() => {
  localStorage.clear();
});

describe(`54 - Implement the recipe screen elements made respecting the attributes
described in the prototype`, () => {
  it('All data-testids are available',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/receitas-feitas' });

      expect(await screen.findByTestId('filter-by-all-btn')).toBeInTheDocument();
      expect(await screen.findByTestId('filter-by-food-btn')).toBeInTheDocument();
      expect(await screen.findByTestId('filter-by-drink-btn')).toBeInTheDocument();
      expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
      expect(await screen.findByTestId('0-horizontal-top-text')).toBeInTheDocument();
      expect(await screen.findByTestId('0-horizontal-name')).toBeInTheDocument();
      expect(await screen.findByTestId('0-horizontal-done-date')).toBeInTheDocument();
      expect(await screen.findByTestId('0-horizontal-share-btn')).toBeInTheDocument();
      expect(await screen.findByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
      expect(await screen.findByTestId('0-Curry-horizontal-tag')).toBeInTheDocument();
      expect(await screen.findByTestId('1-horizontal-image')).toBeInTheDocument();
      expect(await screen.findByTestId('1-horizontal-top-text')).toBeInTheDocument();
      expect(await screen.findByTestId('1-horizontal-name')).toBeInTheDocument();
      expect(await screen.findByTestId('1-horizontal-share-btn')).toBeInTheDocument();
      expect(await screen.findByTestId('1-horizontal-done-date')).toBeInTheDocument();
    });
});
