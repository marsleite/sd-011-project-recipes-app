import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import { testMealsRecipeCard, testDrinksRecipeCard } from '../helper/testRecipeCard';
import * as requestMenu from '../../services/requestMenu';
import App from '../../App';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';

const maxDefaultCards = 12;
const cardTestId = '-recipe-card';
const titleTestId = '-card-name';

const mockedSearchMealByName = jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

const mockedRequestAllMealCategories = jest
  .spyOn(requestMenu, 'requestAllMealCategories')
  .mockImplementation(() => Promise.resolve(mealsFiltersOptions));

const mockedSearchDrinkByName = jest
  .spyOn(requestMenu, 'searchDrinkByName')
  .mockImplementation(() => Promise.resolve(drinksFiltersByAll));

const mockedRequestAllDrinksCategories = jest
  .spyOn(requestMenu, 'requestAllDrinkCategories')
  .mockImplementation(() => Promise.resolve(drinksFiltersOptions));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`25 - Implement the elements of the main recipe screen respecting the 
attributes described in the prototype`, () => {
  it('The screen has the data-testids of all 12 cards from the food screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    expect(mockedSearchMealByName).toBeCalled();
    expect(mockedSearchMealByName).toBeCalledTimes(1);
    expect(mockedRequestAllMealCategories).toBeCalled();
    expect(mockedRequestAllMealCategories).toBeCalledTimes(1);

    const { meals } = mealsFiltersByAll;
    await testMealsRecipeCard(meals, maxDefaultCards, cardTestId, titleTestId);

    expect(screen.queryByTestId('12-recipe-card')).toBeNull();
    expect(screen.queryByTestId('12-recipe-img')).toBeNull();
    expect(screen.queryByTestId('12-recipe-name')).toBeNull();
  });

  it('The screen has the data-testids of all 12 drink screen cards', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });
    expect(mockedSearchDrinkByName).toBeCalled();
    expect(mockedSearchDrinkByName).toBeCalledTimes(1);
    expect(mockedRequestAllDrinksCategories).toBeCalled();
    expect(mockedRequestAllDrinksCategories).toBeCalledTimes(1);

    const { drinks } = drinksFiltersByAll;
    await testDrinksRecipeCard(drinks, maxDefaultCards, cardTestId, titleTestId);

    expect(screen.queryByTestId('12-recipe-card')).toBeNull();
    expect(screen.queryByTestId('12-recipe-img')).toBeNull();
    expect(screen.queryByTestId('12-recipe-name')).toBeNull();
  });
});
