import React from 'react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { testMealsRecipeCard, testDrinksRecipeCard } from '../helper/testRecipeCard';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

const maxDefaultCards = 6;
const cardTestId = '-recomendation-card';
const titleTestId = '-recomendation-title';

const mockedSearchMealByName = jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

const mockedSearchDrinkByName = jest
  .spyOn(requestMenu, 'searchDrinkByName')
  .mockImplementation(() => Promise.resolve(drinksFiltersByAll));

jest
  .spyOn(requestMenu, 'mealsRecipeDetails')
  .mockImplementation(() => Promise.resolve(mealRecipeDetails));

jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(drinkRecipeDetails));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`36 - Implement the recommendations, for food recipes the recommendation should 
be drink and vice versa`, () => {
  it('Check if the request for the food API has been made', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas/52977' });

    const { drinks } = drinksFiltersByAll;
    await testDrinksRecipeCard(drinks, maxDefaultCards, cardTestId, titleTestId);

    expect(mockedSearchDrinkByName).toBeCalled();
    expect(mockedSearchDrinkByName).toBeCalledTimes(1);
  });

  it('Checks whether the request for the beverage API has been made', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas/15997' });

    const { meals } = mealsFiltersByAll;
    await testMealsRecipeCard(meals, maxDefaultCards, cardTestId, titleTestId);

    expect(mockedSearchMealByName).toBeCalled();
    expect(mockedSearchMealByName).toBeCalledTimes(1);
  });
});
