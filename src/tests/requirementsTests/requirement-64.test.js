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

const firstHorizontalNameTestId = '0-horizontal-name';
const secondHorizontalNameTestId = '1-horizontal-name';

describe(`64 - Design the solution so that the "disfavor" button should remove the recipe
from the favorite recipes list in 'localStorage' and from the screen`, () => {
  it(`By clicking on the "disfavorite" button the respective recipe is removed from the
  screen`, async () => {
    renderWithRouterAndStore(<App />, { route: '/receitas-favoritas' });

    expect(await screen.findByTestId(firstHorizontalNameTestId))
      .toHaveTextContent(favoriteRecipes[0].name);
    expect(await screen.findByTestId(secondHorizontalNameTestId))
      .toHaveTextContent(favoriteRecipes[1].name);

    fireEvent.click(await screen.findByTestId('1-horizontal-favorite-btn'));
    expect(await screen.findByTestId(firstHorizontalNameTestId))
      .toHaveTextContent(favoriteRecipes[0].name);
    expect(screen.queryByTestId(secondHorizontalNameTestId)).toBeNull();

    fireEvent.click(await screen.findByTestId('0-horizontal-favorite-btn'));
    expect(screen.queryByTestId(firstHorizontalNameTestId)).toBeNull();
    expect(screen.queryByTestId(secondHorizontalNameTestId)).toBeNull();
  });

  it(`By clicking on the "disfavor" button the respective recipe is removed from
  localStorage`, async () => {
    renderWithRouterAndStore(<App />, { route: '/receitas-favoritas' });

    await wait(() => expect(
      JSON.parse(localStorage.getItem('favoriteRecipes')),
    ).toStrictEqual(favoriteRecipes));

    fireEvent.click(await screen.findByTestId('1-horizontal-favorite-btn'));
    await wait(() => expect(
      JSON.parse(win.localStorage.getItem('favoriteRecipes')),
    ).toStrictEqual([favoriteRecipes[0]]));

    fireEvent.click(await screen.findByTestId('0-horizontal-favorite-btn'));
    await wait(() => expect(
      JSON.parse(win.localStorage.getItem('favoriteRecipes')),
    ).toStrictEqual([]));
  });
});
