import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
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

// Como realizar o mock do clipboard https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest

const originalClipboard = { ...global.navigator.clipboard };

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  const mockClipboard = {
    writeText: jest.fn(),
  };
  global.navigator.clipboard = mockClipboard;
});

afterEach(() => {
  localStorage.clear();
  jest.resetAllMocks();
  global.navigator.clipboard = originalClipboard;
});

describe(`57 - Develop the solution so that the share button should copy the recipe
details screen URL to the clipboard`, () => {
  it('When clicking on the share button the message "Link copiado!"', async () => {
    renderWithRouterAndStore(<App />, { route: '/receitas-feitas' });

    fireEvent.click(await screen.findByTestId('0-horizontal-share-btn'));

    expect(await screen.findByText('Link copiado!')).toBeInTheDocument();
  });

  it('The URL from the recipe details screen is copied to the clipboard', async () => {
    renderWithRouterAndStore(<App />, { route: '/receitas-feitas' });

    fireEvent.click(await screen.findByTestId('0-horizontal-share-btn'));

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(navigator.clipboard.writeText)
      .toHaveBeenCalledWith(expect.stringContaining('comidas/52771'));
  });
});
