import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import { testMealsRecipeCard, testDrinksRecipeCard } from '../helper/testRecipeCard';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import soupMeals from '../mocks/meals/mockMealsByName';
import ginDrinks from '../mocks/drinks/mockDrinksByName';
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
    json: () => Promise.resolve(soupMeals),
  }))
  .mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(ginDrinks),
  }));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe('17 - Show recipes on cards if more than one recipe is found', () => {
  it('If more than one food is found, show the first 12', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });

    const maxSoupMealsCards = 10;

    fireEvent.click(await screen.findByTestId('search-top-btn'));
    fireEvent.click(await screen.findByTestId('name-search-radio'));
    fireEvent.change(
      await screen.findByTestId('search-input'),
      { target: { value: 'soup' } },
    );
    fireEvent.click(await screen.findByTestId('exec-search-btn'));

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
    expect(fetch).toBeCalledTimes(1);

    const { meals } = soupMeals;
    await testMealsRecipeCard(meals, maxSoupMealsCards, '-recipe-card', '-card-name');

    expect(screen.queryByTestId('10-recipe-card')).toBeNull();
    expect(screen.queryByTestId('10-card-img')).toBeNull();
    expect(screen.queryByTestId('10-card-name')).toBeNull();
  });

  it('If more than one drink is found, show the first 12', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });

    const maxGinDrinksCards = 12;

    fireEvent.click(await screen.findByTestId('search-top-btn'));
    fireEvent.click(await screen.findByTestId('name-search-radio'));
    fireEvent.change(
      await screen.findByTestId('search-input'),
      { target: { value: 'gin' } },
    );
    fireEvent.click(await screen.findByTestId('exec-search-btn'));

    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
    expect(fetch).toBeCalledTimes(1);

    const { drinks } = ginDrinks;
    await testDrinksRecipeCard(drinks, maxGinDrinksCards, '-recipe-card', '-card-name');

    expect(screen.queryByTestId('12-recipe-card')).toBeNull();
    expect(screen.queryByTestId('12-card-img')).toBeNull();
    expect(screen.queryByTestId('12-card-name')).toBeNull();
  });
});
