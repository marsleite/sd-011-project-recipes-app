import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinksByIngredient from '../mocks/drinks/mockDrinksByIngredient';
import ginDrinks from '../mocks/drinks/mockDrinksByName';
import drinksByFirstLetter from '../mocks/drinks/mockDrinksByFirstLetter';
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

const fetch = jest
  .spyOn(global, 'fetch')
  .mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(drinksByIngredient),
  }))
  .mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(ginDrinks),
  }))
  .mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(drinksByFirstLetter),
  }));

const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

const searchTopBtnTestId = 'search-top-btn';
const ingredientSearchRadioTestId = 'ingredient-search-radio';
const searchInputTestId = 'search-input';
const execSearchBtnTestId = 'exec-search-btn';
const nameSearchRadioTestId = 'name-search-radio';
const firstLetterSearchRadioTestId = 'first-letter-search-radio';

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`15 - Search the food API if the person is on the food page and on the drinks
page if the person is on the drinks`, () => {
  it(`In the drinks screen, if the selected radio is Ingredient, the API search is done
  correctly for the ingredient`, async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });

    fireEvent.click(await screen.findByTestId(searchTopBtnTestId));
    fireEvent.click(await screen.findByTestId(ingredientSearchRadioTestId));
    fireEvent.change(
      await screen.findByTestId(searchInputTestId),
      { target: { value: 'lemon' } },
    );
    fireEvent.click(await screen.findByTestId(execSearchBtnTestId));

    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');
    expect(fetch).toBeCalledTimes(1);
  });

  it(`In the drinks screen, if the selected radio is Name, the API search is done
  correctly by name`, async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });

    fireEvent.click(await screen.findByTestId(searchTopBtnTestId));
    fireEvent.click(await screen.findByTestId(nameSearchRadioTestId));
    fireEvent.change(
      await screen.findByTestId(searchInputTestId),
      { target: { value: 'gin' } },
    );
    fireEvent.click(await screen.findByTestId(execSearchBtnTestId));

    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
    expect(fetch).toBeCalledTimes(1);
  });

  it(`In the drinks screen, if the selected radio is First letter, the API search is
  done correctly by the first letter`, async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });

    fireEvent.click(await screen.findByTestId(searchTopBtnTestId));
    fireEvent.click(await screen.findByTestId(firstLetterSearchRadioTestId));
    fireEvent.change(
      await screen.findByTestId(searchInputTestId),
      { target: { value: 'a' } },
    );
    fireEvent.click(await screen.findByTestId(execSearchBtnTestId));

    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
    expect(fetch).toBeCalledTimes(1);
  });

  it(`In the drinks screen, if the selected radio is First Letter and the API search is
  made with more than one letter, an alert should be displayed`, async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });

    fireEvent.click(await screen.findByTestId(searchTopBtnTestId));
    fireEvent.click(await screen.findByTestId(firstLetterSearchRadioTestId));
    fireEvent.change(
      await screen.findByTestId(searchInputTestId),
      { target: { value: 'aaa' } },
    );
    fireEvent.click(await screen.findByTestId(execSearchBtnTestId));

    expect(alert).toBeCalledWith('Sua busca deve conter somente 1 (um) caracter');
  });
});
