import React from 'react';
import { screen, wait } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import mealsIngredients from '../mocks/meals/mockMealsIngredients';
import listAllMealsAreas from '../mocks/meals/mockListAllMealsAreas';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import drinksIngredients from '../mocks/drinks/mockDrinksIngredients';
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
  .mockImplementation(() => Promise.resolve(mealRecipeDetails));

jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(drinkRecipeDetails));

jest
  .spyOn(requestMenu, 'listAllMealsIngredients')
  .mockImplementation(() => Promise.resolve(mealsIngredients));

jest
  .spyOn(requestMenu, 'listAllDrinksIngredients')
  .mockImplementation(() => Promise.resolve(drinksIngredients));

jest
  .spyOn(requestMenu, 'listAllMealsAreas')
  .mockImplementation(() => Promise.resolve(listAllMealsAreas));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe('21 - Display the lower menu only on the screens indicated by the prototype',
  () => {
    const hasNoFooter = () => {
      expect(screen.queryByTestId('footer')).toBeNull();
      expect(screen.queryByTestId('drinks-bottom-btn')).toBeNull();
      expect(screen.queryByTestId('explore-bottom-btn')).toBeNull();
      expect(screen.queryByTestId('food-bottom-btn')).toBeNull();
    };

    const hasFooter = async () => {
      const footer = await screen.findByTestId('footer');
      const drinksBottomBtn = await screen.findByTestId('drinks-bottom-btn');
      const exploreBottomBtn = await screen.findByTestId('explore-bottom-btn');
      const foodBottomBtn = await screen.findByTestId('food-bottom-btn');

      expect(footer).toBeInTheDocument();
      await wait(() => expect(footer).toHaveStyle('position: fixed'));
      await wait(() => expect(footer).toHaveStyle('bottom: 0px'));

      expect(drinksBottomBtn).toBeInTheDocument();
      expect(drinksBottomBtn).toHaveAttribute(
        'src', expect.stringContaining('drinkIcon'),
      );

      expect(exploreBottomBtn).toBeInTheDocument();
      expect(exploreBottomBtn).toHaveAttribute(
        'src', expect.stringContaining('exploreIcon'),
      );

      expect(foodBottomBtn).toBeInTheDocument();
      expect(foodBottomBtn).toHaveAttribute(
        'src', expect.stringContaining('mealIcon'),
      );
    };

    it('There is no footer in the login screen', () => {
      renderWithRouterAndStore(<App />, { route: '/' });

      hasNoFooter();
    });

    it('There is footer on the main food recipe screen', async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas' });

      await hasFooter();
    });

    it('There is footer on the main drink recipes screen', async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas' });

      await hasFooter();
    });

    it('There is no footer in the details screen of a food recipe', () => {
      renderWithRouterAndStore(<App />, { route: '/comidas/52977' });

      hasNoFooter();
    });

    it('There is no footer in the details screen of a drink recipe', () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas/15997' });

      hasNoFooter();
    });

    it('There is no footer in the recipe screen in food process', () => {
      renderWithRouterAndStore(<App />, { route: '/comidas/52977/in-progress' });

      hasNoFooter();
    });

    it('There is no footer in the recipe screen while drinking', () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas/15997/in-progress' });

      hasNoFooter();
    });

    it('There is footer on the explore screen', async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar' });

      await hasFooter();
    });

    it('There is footer on the food explore screen', async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar/comidas' });

      await hasFooter();
    });

    it('There is footer on the screen to explore drinks', async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar/bebidas' });

      await hasFooter();
    });

    it('There is footer on the screen to explore foods by ingredient', async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar/comidas/ingredientes' });

      await hasFooter();
    });

    it('There is footer on the screen to explore drinks by ingredient', async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar/bebidas/ingredientes' });

      await hasFooter();
    });

    it('There is footer on the screen to explore foods by place of origin', async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar/comidas/area' });

      await hasFooter();
    });

    it('There is footer on the profile screen', async () => {
      renderWithRouterAndStore(<App />, { route: '/perfil' });

      await hasFooter();
    });

    it('There is no footer in the recipes made screen', () => {
      renderWithRouterAndStore(<App />, { route: '/receitas-feitas' });

      hasNoFooter();
    });

    it('There is no footer in the favorite recipes screen', () => {
      renderWithRouterAndStore(<App />, { route: '/receitas-favoritas' });

      hasNoFooter();
    });
  });
