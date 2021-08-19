import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';

const fetch = jest.spyOn(global, 'fetch');

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`74 - Redirect the user by clicking "Me Surpreenda!", the route should change to
the recipe details screen, which should be chosen randomly through the API`, () => {
  it(`By clicking the "Por Ingredientes" button from the explore food screen the route
  changes to the random food details page`, async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mealRecipeDetails),
      }));

    const { history } = renderWithRouterAndStore(<App />, { route: '/explorar/comidas' });

    const exploreSurprise = await screen.findByTestId('explore-surprise');
    fireEvent.click(exploreSurprise);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');
    expect(fetch).toHaveBeenCalledTimes(1);

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas/52977');
  });

  it(`By clicking on the "Explorar Bebidas" button from the explore drinks screen the
  route changesto the random drink details page`, async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(drinkRecipeDetails),
      }));

    const { history } = renderWithRouterAndStore(<App />, { route: '/explorar/bebidas' });

    const exploreSurprise = await screen.findByTestId('explore-surprise');
    fireEvent.click(exploreSurprise);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    expect(fetch).toHaveBeenCalledTimes(1);

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas/15997');
  });
});
