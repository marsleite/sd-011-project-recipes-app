import React from 'react';
import { screen, fireEvent, wait } from '@testing-library/react';
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

describe(`66 - Redirect the user by clicking on the photo or on the name of the recipe,
the route should change to that recipe's details screen`, () => {
  it('By clicking on the "Food" button the recipes must be filtered by food',
    async () => {
      const { history } = renderWithRouterAndStore(
        <App />, { route: '/receitas-favoritas' },
      );

      fireEvent.click(await screen.findByTestId('0-horizontal-image'));

      const { location: { pathname } } = history;
      await wait(() => expect(pathname).toBe('/comidas/52771'));
    });

  it('By clicking on the "Drinks" button the recipes must be filtered by drinks',
    async () => {
      const { history } = renderWithRouterAndStore(
        <App />, { route: '/receitas-favoritas' },
      );

      fireEvent.click(await screen.findByTestId('1-horizontal-name'));

      const { location: { pathname } } = history;
      await wait(() => expect(pathname).toBe('/bebidas/178319'));
    });
});
