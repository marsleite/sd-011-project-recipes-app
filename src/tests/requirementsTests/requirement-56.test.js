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

describe(`56 - Develop the screen so that, if the recipe on the card is a drink, it must
have: the picture of the recipe, the name, if it is alcoholic, the date the person made
the recipe and a share button`, () => {
  it('The card has the correct attributes of a drink', async () => {
    renderWithRouterAndStore(<App />, { route: '/receitas-feitas' });

    expect(await screen.findByTestId('1-horizontal-image'))
      .toHaveAttribute('src', expect.stringContaining(doneRecipes[1].image));

    expect(await screen.findByTestId('1-horizontal-top-text'))
      .toHaveTextContent(doneRecipes[1].alcoholicOrNot);

    expect(await screen.findByTestId('1-horizontal-name'))
      .toHaveTextContent(doneRecipes[1].name);

    expect(await screen.findByTestId('1-horizontal-share-btn'))
      .toHaveAttribute('src', expect.stringContaining('shareIcon'));
    expect(await screen.findByTestId('0-horizontal-done-date'))
      .toHaveTextContent(doneRecipes[1].doneDate);
  });
});
