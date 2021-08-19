import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import {
  testMealsRecipeIngredient,
  testDrinksRecipeIngredient,
} from '../helper/testeIngredientCard';
import App from '../../App';
import mealsIngredients from '../mocks/meals/mockMealsIngredients';
import drinksIngredients from '../mocks/drinks/mockDrinksIngredients';
import * as requestMenu from '../../services/requestMenu';

const maxDefaultCards = 12;

const mockMealsIngredients = jest
  .spyOn(requestMenu, 'listAllMealsIngredients')
  .mockImplementation(() => Promise.resolve(mealsIngredients));

const mockDrinksIngredients = jest
  .spyOn(requestMenu, 'listAllDrinksIngredients')
  .mockImplementation(() => Promise.resolve(drinksIngredients));

describe(`75/76 - Implement the explore ingredients screen elements respecting the
attributes described in the prototype`, () => {
  it(`It has the correct data-testids, name and photo for the explore food by
  ingredients screen`,
  async () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/comidas/ingredientes' });

    expect(mockMealsIngredients).toHaveBeenCalled();
    expect(mockMealsIngredients).toHaveBeenCalledTimes(1);

    const { meals } = mealsIngredients;
    await testMealsRecipeIngredient(meals, maxDefaultCards);

    const twelfthFoodCardIngredient = screen.queryByTestId('12-ingredient-card');
    const twelfthFoodCardIngredientImage = screen.queryByTestId('12-card-img');
    const twelfthFoodCardIngredientName = screen.queryByTestId('12-card-name');

    expect(twelfthFoodCardIngredient).not.toBeInTheDocument();
    expect(twelfthFoodCardIngredientImage).not.toBeInTheDocument();
    expect(twelfthFoodCardIngredientName).not.toBeInTheDocument();
  });

  it(`It has the correct data-testids, name and photo for the explore drinks by
  ingredients screen`, async () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/bebidas/ingredientes' });

    expect(mockDrinksIngredients).toHaveBeenCalled();
    expect(mockDrinksIngredients).toHaveBeenCalledTimes(1);

    const { drinks } = drinksIngredients;
    await testDrinksRecipeIngredient(drinks, maxDefaultCards);

    const twelfthFoodCardIngredient = screen.queryByTestId('12-ingredient-card');
    const twelfthFoodCardIngredientImage = screen.queryByTestId('12-card-img');
    const twelfthFoodCardIngredientName = screen.queryByTestId('12-card-name');

    expect(twelfthFoodCardIngredient).not.toBeInTheDocument();
    expect(twelfthFoodCardIngredientImage).not.toBeInTheDocument();
    expect(twelfthFoodCardIngredientName).not.toBeInTheDocument();
  });
});
