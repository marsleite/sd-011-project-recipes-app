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

describe(`55 - Develop the screen so that, if the recipe on the card is a food, it must
have: the picture of the recipe, the name, the category, the area, the date the person
made the recipe, the first 2 tags returned by the API and a share button`, () => {
  it('The card has the correct attributes of a food', async () => {
    renderWithRouterAndStore(<App />, { route: '/receitas-feitas' });

    expect(await screen.findByTestId('0-horizontal-image'))
      .toHaveAttribute('src', expect.stringContaining(doneRecipes[0].image));
    expect(await screen.findByTestId('0-horizontal-top-text'))
      .toHaveTextContent(`${doneRecipes[0].area} - ${doneRecipes[0].category}`);
    expect(await screen.findByTestId('0-horizontal-name'))
      .toHaveTextContent(doneRecipes[0].name);
    expect(await screen.findByTestId('0-horizontal-share-btn'))
      .toHaveAttribute('src', expect.stringContaining('shareIcon'));
    expect(await screen.findByTestId('0-horizontal-done-date'))
      .toHaveTextContent(doneRecipes[0].doneDate);
    expect(await screen.findByTestId('0-Pasta-horizontal-tag'))
      .toHaveTextContent(doneRecipes[0].tags[0]);
    expect(await screen.findByTestId('0-Curry-horizontal-tag'))
      .toHaveTextContent(doneRecipes[0].tags[1]);
  });
});
