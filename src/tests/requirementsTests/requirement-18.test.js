import React from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
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
    json: () => Promise.resolve({ meals: null }),
  }))
  .mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ drinks: null }),
  }));

const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

const checkAlert = () => (
  expect(alert).toBeCalledWith(
    'Sinto muito, não encontramos nenhuma receita para esses filtros.',
  ));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe('18 - Display an `alert` if no recipe is found', () => {
  it('If no food is found the alert should be displayed', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    fireEvent.click(await screen.findByTestId('search-top-btn'));
    fireEvent.click(await screen.findByTestId('name-search-radio'));
    fireEvent.change(
      await screen.findByTestId('search-input'),
      { target: { value: 'xablau' } },
    );
    fireEvent.click(await screen.findByTestId('exec-search-btn'));

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=xablau');
    expect(fetch).toBeCalledTimes(1);

    await wait(() => checkAlert());
  });

  it('If no drink is found, the alert should be displayed', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });

    fireEvent.click(await screen.findByTestId('search-top-btn'));
    fireEvent.click(await screen.findByTestId('name-search-radio'));
    fireEvent.change(
      await screen.findByTestId('search-input'),
      { target: { value: 'xablau' } },
    );
    fireEvent.click(await screen.findByTestId('exec-search-btn'));

    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau');
    expect(fetch).toBeCalledTimes(1);

    await wait(() => checkAlert());
  });
});
