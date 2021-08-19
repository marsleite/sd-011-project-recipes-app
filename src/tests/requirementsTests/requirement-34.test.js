import React from 'react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import * as requestMenu from '../../services/requestMenu';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

const mockMealsRecipeDetails = jest
  .spyOn(requestMenu, 'mealsRecipeDetails')
  .mockImplementation(() => Promise.resolve(mealRecipeDetails));

const mockDrinksRecipeDetails = jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(drinkRecipeDetails));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`34 - Make a request to the API passing the id of the recipe that must be 
available in the URL parameters`, () => {
  it('Check if the request for the food API has been made', () => {
    renderWithRouterAndStore(<App />, { route: '/comidas/52977' });

    expect(mockMealsRecipeDetails).toHaveBeenCalled();
    expect(mockMealsRecipeDetails).toHaveBeenCalledWith('52977');
    expect(mockMealsRecipeDetails).toHaveBeenCalledTimes(1);
  });

  it('Checks whether the request for the drink\'s API has been made', () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas/15997' });

    expect(mockDrinksRecipeDetails).toHaveBeenCalled();
    expect(mockDrinksRecipeDetails).toHaveBeenCalledWith('15997');
    expect(mockDrinksRecipeDetails).toHaveBeenCalledTimes(1);
  });
});
