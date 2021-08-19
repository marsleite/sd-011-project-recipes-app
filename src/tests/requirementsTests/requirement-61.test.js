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

describe(`61 - Develop the screen so that, if the recipe on the card is a food, it must
have: the picture of the recipe, the name, the category, the area, a share button and
a "disfavorite" button`, () => {
  it('The card has the correct attributes of a food', async () => {
    renderWithRouterAndStore(<App />, { route: '/receitas-favoritas' });

    expect(await screen.findByTestId('0-horizontal-image'))
      .toHaveAttribute('src', expect.stringContaining(favoriteRecipes[0].image));
    expect(await screen.findByTestId('0-horizontal-top-text'))
      .toHaveTextContent(`${favoriteRecipes[0].area} - ${favoriteRecipes[0].category}`);
    expect(await screen.findByTestId('0-horizontal-name'))
      .toHaveTextContent(favoriteRecipes[0].name);
    expect(await screen.findByTestId('0-horizontal-share-btn'))
      .toHaveAttribute('src', expect.stringContaining('shareIcon'));
    expect(await screen.findByTestId('0-horizontal-favorite-btn'))
      .toHaveAttribute('src', expect.stringContaining('blackHeartIcon'));
  });
});
