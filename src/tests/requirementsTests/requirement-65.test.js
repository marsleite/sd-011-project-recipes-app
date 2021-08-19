import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
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

const pathname = '/receitas-favoritas';
const firstHorizontalName = '0-horizontal-name';
const secondHorizontalName = '1-horizontal-name';

describe(`65 - Implement 2 buttons that filter recipes by food or drink and a third
one that removes all filters`, () => {
  it('By clicking on the "Food" button the recipes must be filtered by food',
    async () => {
      renderWithRouterAndStore(<App />, { route: pathname });

      fireEvent.click(await screen.findByTestId('filter-by-food-btn'));

      expect(await screen.findByTestId(firstHorizontalName))
        .toHaveTextContent(favoriteRecipes[0].name);
      expect(screen.queryByTestId(secondHorizontalName)).toBeNull();
    });

  it('By clicking on the "Drinks" button the recipes must be filtered by drinks',
    async () => {
      renderWithRouterAndStore(<App />, { route: pathname });

      fireEvent.click(await screen.findByTestId('filter-by-drink-btn'));

      expect(await screen.findByTestId(firstHorizontalName))
        .toHaveTextContent(favoriteRecipes[1].name);
      expect(screen.queryByTestId(secondHorizontalName)).toBeNull();
    });

  it('By clicking on the "All" button the filter must be removed',
    async () => {
      renderWithRouterAndStore(<App />, { route: pathname });

      fireEvent.click(await screen.findByTestId('filter-by-food-btn'));
      fireEvent.click(await screen.findByTestId('filter-by-all-btn'));

      expect(await screen.findByTestId(firstHorizontalName))
        .toHaveTextContent(favoriteRecipes[0].name);
      expect(await screen.findByTestId(secondHorizontalName))
        .toHaveTextContent(favoriteRecipes[1].name);
    });
});
