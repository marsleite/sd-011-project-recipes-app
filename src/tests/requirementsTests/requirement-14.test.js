import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import mealsByIngredient from '../mocks/meals/mockMealsByIngredient';
import soupMeals from '../mocks/meals/mockMealsByName';
import mealsByFirstLetter from '../mocks/meals/mockMealsByFirstLetter';
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
  .mockImplementationOnce(() => Promise.resolve(mealsByIngredient))
  .mockImplementationOnce(() => Promise.resolve(soupMeals))
  .mockImplementationOnce(() => Promise.resolve(mealsByFirstLetter));

const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

const searchTopBtnTestId = 'search-top-btn';
const ingredientSearchRadioTestId = 'ingredient-search-radio';
const searchInputTestId = 'search-input';
const execSearchBtnTestId = 'exec-search-btn';
const nameSearchRadioTestId = 'name-search-radio';
const firstLetterSearchRadioTestId = 'first-letter-search-radio';

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`14 - Position the bar right below the header and implement 3 radio buttons:
Ingredient, Name and First Letter`, () => {
  it(`If the selected radio is Ingredient, the API search is done correctly for the
  ingredient`, async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    fireEvent.click(await screen.findByTestId(searchTopBtnTestId));
    fireEvent.click(await screen.findByTestId(ingredientSearchRadioTestId));
    fireEvent.change(
      await screen.findByTestId(searchInputTestId),
      { target: { value: 'chicken' } },
    );
    fireEvent.click(await screen.findByTestId(execSearchBtnTestId));

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    expect(fetch).toBeCalledTimes(1);
  });

  it('If the selected radio is Name, the API search is done correctly by name',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas' });

      fireEvent.click(await screen.findByTestId(searchTopBtnTestId));
      fireEvent.click(await screen.findByTestId(nameSearchRadioTestId));
      fireEvent.change(
        await screen.findByTestId(searchInputTestId),
        { target: { value: 'soup' } },
      );
      fireEvent.click(await screen.findByTestId(execSearchBtnTestId));

      expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
      expect(fetch).toBeCalledTimes(1);
    });

  it(`If the selected radio is First letter, the API search is done correctly by the
  first letter`, async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    fireEvent.click(await screen.findByTestId(searchTopBtnTestId));
    fireEvent.click(await screen.findByTestId(firstLetterSearchRadioTestId));
    fireEvent.change(
      await screen.findByTestId(searchInputTestId),
      { target: { value: 'a' } },
    );
    fireEvent.click(await screen.findByTestId(execSearchBtnTestId));

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    expect(fetch).toBeCalledTimes(1);
  });

  it(`If the selected radio is First Letter and the API search is done with more than one
  letter, an alert should be displayed`, async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

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
