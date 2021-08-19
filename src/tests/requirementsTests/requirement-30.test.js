import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { testMealsRecipeCard, testDrinksRecipeCard } from '../helper/testRecipeCard';
import { mockFilterDrinkByCategory, mockFilterMealByCategory } from '../helper/mockAPI';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealsFilterByBeef from '../mocks/meals/mockFilterByBeef';
import mealsFilterByBreakfast from '../mocks/meals/mockFilterByBreakfast';
import mealsFilterByChicken from '../mocks/meals/mockFilterByChicken';
import mealsFilterByDessert from '../mocks/meals/mockFilterByDessert';
import mealsFilterByGoat from '../mocks/meals/mockFilterByGoat';
import drinksFilterByOrdinaryDrink from '../mocks/drinks/mockFilterByOrdinaryDrink';
import drinksFilterByCocktail from '../mocks/drinks/mockFilterByCocktail';
import drinksFilterByMilkFloatShake from '../mocks/drinks/mockFilterByMilkFloatShake';
import drinksFilterByOtherUnknown from '../mocks/drinks/mockFilterByOtherUnknown';
import drinksFilterByCocoa from '../mocks/drinks/mockFilterByCocoa';
import * as requestMenu from '../../services/requestMenu';
import App from '../../App';

const maxDefaultCards = 12;
const cardTestId = '-recipe-card';
const titleTestId = '-card-name';

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

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe('30 - Implement the category filter so that only one is selected at a time',
  () => {
    it(`If the recipes are for food, only one category filter must be able to be 
    selected at a time`, async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas' });

      mockFilterMealByCategory(mealsFilterByBeef);

      const beefFilterOption = await screen.findByTestId(
        'Beef-category-filter',
      );
      fireEvent.click(beefFilterOption);

      const { meals: beefMeals } = mealsFilterByBeef;
      await testMealsRecipeCard(beefMeals, maxDefaultCards, cardTestId, titleTestId);

      mockFilterMealByCategory(mealsFilterByBreakfast);

      const breakfastFilterOption = await screen.findByTestId(
        'Breakfast-category-filter',
      );
      fireEvent.click(breakfastFilterOption);

      const { meals: breakfastMeals } = mealsFilterByBreakfast;
      await testMealsRecipeCard(breakfastMeals, maxDefaultCards, cardTestId, titleTestId);

      mockFilterMealByCategory(mealsFilterByChicken);

      const chickenFilterOption = await screen.findByTestId(
        'Chicken-category-filter',
      );
      fireEvent.click(chickenFilterOption);

      const { meals: chickenMeals } = mealsFilterByChicken;
      await testMealsRecipeCard(chickenMeals, maxDefaultCards, cardTestId, titleTestId);

      mockFilterMealByCategory(mealsFilterByDessert);

      const dessertFilterOption = await screen.findByTestId(
        'Dessert-category-filter',
      );
      fireEvent.click(dessertFilterOption);

      const { meals: dessertMeals } = mealsFilterByDessert;
      await testMealsRecipeCard(dessertMeals, maxDefaultCards, cardTestId, titleTestId);

      mockFilterMealByCategory(mealsFilterByGoat);

      const goatFilterOption = await screen.findByTestId(
        'Goat-category-filter',
      );
      fireEvent.click(goatFilterOption);

      const { meals: goatMeals } = mealsFilterByGoat;
      await testMealsRecipeCard(goatMeals, maxDefaultCards, cardTestId, titleTestId);
    });

    it(`If the recipes are for drinks, only one category filter must be able to be 
    selected at a time`, async () => {
      renderWithRouterAndStore(<App />, { route: '/bebidas' });

      mockFilterDrinkByCategory(drinksFilterByOrdinaryDrink);

      const ordinaryDrinkFilterOption = await screen.findByTestId(
        'Ordinary Drink-category-filter',
      );
      fireEvent.click(ordinaryDrinkFilterOption);

      const { drinks: ordinaryDrinks } = drinksFilterByOrdinaryDrink;
      await testDrinksRecipeCard(
        ordinaryDrinks, maxDefaultCards, cardTestId, titleTestId,
      );

      mockFilterDrinkByCategory(drinksFilterByCocktail);

      const cocktailFilterOption = await screen.findByTestId(
        'Cocktail-category-filter',
      );
      fireEvent.click(cocktailFilterOption);

      const { drinks: cocktailDrinks } = drinksFilterByCocktail;
      await testDrinksRecipeCard(
        cocktailDrinks, maxDefaultCards, cardTestId, titleTestId,
      );

      mockFilterDrinkByCategory(drinksFilterByMilkFloatShake);

      const MilkFloatShakeFilterOption = await screen.findByTestId(
        'Milk / Float / Shake-category-filter',
      );
      fireEvent.click(MilkFloatShakeFilterOption);

      const { drinks: milkFloatShakeDrinks } = drinksFilterByMilkFloatShake;
      await testDrinksRecipeCard(
        milkFloatShakeDrinks, maxDefaultCards, cardTestId, titleTestId,
      );

      mockFilterDrinkByCategory(drinksFilterByOtherUnknown);

      const otherUnknownFilterOption = await screen.findByTestId(
        'Other/Unknown-category-filter',
      );
      fireEvent.click(otherUnknownFilterOption);

      const { drinks: otherUnknownDrinks } = drinksFilterByOtherUnknown;
      await testDrinksRecipeCard(
        otherUnknownDrinks, maxDefaultCards, cardTestId, titleTestId,
      );

      mockFilterDrinkByCategory(drinksFilterByCocoa);

      const cocoaFilterOption = await screen.findByTestId(
        'Cocoa-category-filter',
      );
      fireEvent.click(cocoaFilterOption);

      const { drinks: cocoaDrinks } = drinksFilterByCocoa;
      await testDrinksRecipeCard(cocoaDrinks, maxDefaultCards, cardTestId, titleTestId);
    });
  });
