import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

const mockMealPath = '/comidas/52977';
const mockDrinkPath = '/bebidas/15997';

jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

jest
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

afterEach(() => {
  localStorage.removeItem('doneRecipes');
});

describe(`39 - Implement the solution so that if the recipe has already been made, the 
"Start Recipe" button should disappear`, () => {
  it('Check if the start recipe button is not visible in the details screen of a food,',
    () => {
      const doneRecipes = [{
        id: '52977',
        type: 'comida',
        area: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        doneDate: '22/6/2020',
        tags: ['Soup'],
      }];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      renderWithRouterAndStore(<App />, { route: mockMealPath });

      const startRecipeBtn = screen.queryByTestId('start-recipe-btn');
      expect(startRecipeBtn).toBeNull();
    });

  it('Check if start recipe button is not visible on a drink\'s details screen', () => {
    const doneRecipes = [{
      id: '15997',
      type: 'bebida',
      area: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Optional alcohol',
      name: 'GG',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      doneDate: '23/6/2020',
      tags: [],
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    renderWithRouterAndStore(<App />, { route: mockDrinkPath });

    const startRecipeBtn = screen.queryByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeNull();
  });
});
