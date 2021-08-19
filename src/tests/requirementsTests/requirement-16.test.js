import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import oneMeal from '../mocks/meals/mockOneMeal';
import oneDrink from '../mocks/drinks/mockOneDrink';
import * as requestMenu from '../../services/requestMenu';
import App from '../../App';

jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

jest
  .spyOn(requestMenu, 'requestAllMealCategories')
  .mockImplementation(() => Promise.resolve(mealsFiltersOptions));

jest
  .spyOn(requestMenu, 'searchDrinkByName')
  .mockImplementation(() => Promise.resolve(drinksFiltersByAll));

jest
  .spyOn(requestMenu, 'requestAllDrinkCategories')
  .mockImplementation(() => Promise.resolve(drinksFiltersOptions));

jest
  .spyOn(requestMenu, 'mealsRecipeDetails')
  .mockImplementation(() => Promise.resolve(oneMeal));

jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(oneDrink));

const fetch = jest
  .spyOn(global, 'fetch')
  .mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(oneMeal),
  }))
  .mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(oneDrink),
  }));

jest.spyOn(window, 'alert').mockImplementation(() => {});

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`16 - Redirect to recipe details screen if only one recipe is found, with its
ID in the URL`, () => {
  it('If only one food is found, go to its detail route.', async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/comidas' });

    fireEvent.click(await screen.findByTestId('search-top-btn'));
    fireEvent.click(await screen.findByTestId('name-search-radio'));
    fireEvent.change(
      await screen.findByTestId('search-input'),
      { target: { value: 'Arrabiata' } },
    );
    fireEvent.click(await screen.findByTestId('exec-search-btn'));

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
    expect(fetch).toBeCalledTimes(1);

    expect(await screen.findByTestId('start-recipe-btn')).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas/52771');
  });

  it('If only one drink is found, go to its detail route.', async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/bebidas' });

    fireEvent.click(await screen.findByTestId('search-top-btn'));
    fireEvent.click(await screen.findByTestId('name-search-radio'));
    fireEvent.change(
      await screen.findByTestId('search-input'),
      { target: { value: 'Aquamarine' } },
    );
    fireEvent.click(await screen.findByTestId('exec-search-btn'));

    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');
    expect(fetch).toBeCalledTimes(1);

    expect(await screen.findByTestId('start-recipe-btn')).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/bebidas/178319');
  });
});
