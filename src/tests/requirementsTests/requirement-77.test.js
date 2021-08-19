import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { testMealsRecipeCard, testDrinksRecipeCard } from '../helper/testRecipeCard';
import App from '../../App';
import mealsIngredients from '../mocks/meals/mockMealsIngredients';
import mealsByBeefIngredient from '../mocks/meals/mockMealsByBeefIngredient';
import drinksIngredients from '../mocks/drinks/mockDrinksIngredients';
import drinksByLightRumIngredient from '../mocks/drinks/mockDrinksByLightRunIngredient';
import * as requestMenu from '../../services/requestMenu';

const maxDefaultCards = 12;
const cardTestId = '-recipe-card';
const titleTestId = '-card-name';

jest
  .spyOn(requestMenu, 'listAllMealsIngredients')
  .mockImplementation(() => Promise.resolve(mealsIngredients));

jest
  .spyOn(requestMenu, 'listAllDrinksIngredients')
  .mockImplementation(() => Promise.resolve(drinksIngredients));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`77 - Redirects the user by clicking on the ingredient card, the route should
change to the main recipe screen but showing only the recipes that contain the chosen
ingredient`, () => {
  it(`By clicking on the ingredient card from the explore foods by ingredient screen
  the route changes to the main recipe screen filtered by ingredient`, async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mealsByBeefIngredient),
      }));

    renderWithRouterAndStore(<App />, { route: '/explorar/comidas/ingredientes' });

    const beefIngredientCard = await screen.findByTestId('2-ingredient-card');
    fireEvent.click(beefIngredientCard);

    const { meals } = mealsByBeefIngredient;
    await testMealsRecipeCard(meals, maxDefaultCards, cardTestId, titleTestId);

    const twelfthFoodCardIngredient = screen.queryByTestId('12-recipe-card');
    const twelfthFoodCardIngredientImage = screen.queryByTestId('12-card-img');
    const twelfthFoodCardIngredientName = screen.queryByTestId('12-card-name');

    expect(twelfthFoodCardIngredient).not.toBeInTheDocument();
    expect(twelfthFoodCardIngredientImage).not.toBeInTheDocument();
    expect(twelfthFoodCardIngredientName).not.toBeInTheDocument();
  });

  it(`By clicking on the ingredient card in the explore drinks by ingredient screen
  the route changes to the main ingredient filtered recipe screen`, async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(drinksByLightRumIngredient),
      }));

    renderWithRouterAndStore(<App />, { route: '/explorar/bebidas/ingredientes' });

    const lightRunIngredientCard = await screen.findByTestId('0-ingredient-card');
    fireEvent.click(lightRunIngredientCard);

    const { drinks } = drinksByLightRumIngredient;
    await testDrinksRecipeCard(drinks, maxDefaultCards, cardTestId, titleTestId);

    const twelfthFoodCardIngredient = screen.queryByTestId('12-recipe-card');
    const twelfthFoodCardIngredientImage = screen.queryByTestId('12-card-img');
    const twelfthFoodCardIngredientName = screen.queryByTestId('12-card-name');

    expect(twelfthFoodCardIngredient).not.toBeInTheDocument();
    expect(twelfthFoodCardIngredientImage).not.toBeInTheDocument();
    expect(twelfthFoodCardIngredientName).not.toBeInTheDocument();
  });
});
