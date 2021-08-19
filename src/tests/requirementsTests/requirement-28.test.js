import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { testMealsRecipeCard, testDrinksRecipeCard } from '../helper/testRecipeCard';
import { mockFilterDrinkByCategory, mockFilterMealByCategory } from '../helper/mockAPI';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
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

describe(`28 - Implement the recipe filter through the API by clicking on the category 
filter`, () => {
  it(`If the recipes are for food and the category is "Beef", you must load the first 
  12 recipes of Beef`, async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const mockFilterMealByBeef = mockFilterMealByCategory(mealsFilterByBeef);
    const beefFilterOption = await screen.findByTestId('Beef-category-filter');
    fireEvent.click(beefFilterOption);
    expect(mockFilterMealByBeef).toBeCalled();
    expect(mockFilterMealByBeef).toBeCalledTimes(1);
    const cards = await screen.findAllByRole('link', { name: /card-menu/i });
    expect(cards.length).toBe(maxDefaultCards);
    expect(cards.length).not.toBe(maxDefaultCards + 1);
    const { meals } = mealsFilterByBeef;
    await testMealsRecipeCard(meals, maxDefaultCards, cardTestId, titleTestId);
  });

  it(`If the recipes are for food and the category is "Breakfast", you must load the 
  first 12 recipes of Breakfast`, async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const mockFilterMealByBreakfast = mockFilterMealByCategory(mealsFilterByBreakfast);
    const maxBreakfastCards = 7;
    const breakfastFilterOption = await screen.findByTestId('Breakfast-category-filter');
    fireEvent.click(breakfastFilterOption);
    expect(mockFilterMealByBreakfast).toBeCalled();
    expect(mockFilterMealByBreakfast).toBeCalledTimes(1);
    const cards = await screen.findAllByRole('link', { name: /card-menu/i });
    expect(cards.length).toBe(maxBreakfastCards);
    expect(cards.length).not.toBe(maxBreakfastCards + 1);
    const { meals } = mealsFilterByBreakfast;
    await testMealsRecipeCard(meals, maxBreakfastCards, cardTestId, titleTestId);
  });

  it(`If the recipes are for food and the category is "Chicken", you must load the first 
  12 recipes of Chicken`, async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const mockFilterMealByChicken = mockFilterMealByCategory(mealsFilterByChicken);
    const chickenFilterOption = await screen.findByTestId('Chicken-category-filter');
    fireEvent.click(chickenFilterOption);
    expect(mockFilterMealByChicken).toBeCalled();
    expect(mockFilterMealByChicken).toBeCalledTimes(1);
    const cards = await screen.findAllByRole('link', { name: /card-menu/i });
    expect(cards.length).toBe(maxDefaultCards);
    expect(cards.length).not.toBe(maxDefaultCards + 1);
    const { meals } = mealsFilterByChicken;
    await testMealsRecipeCard(meals, maxDefaultCards, cardTestId, titleTestId);
  });

  it(`If the recipes are for food and the category is "Dessert", you must load the first 
  12 recipes of Dessert`, async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const mockFilterMealByDessert = mockFilterMealByCategory(mealsFilterByDessert);
    const dessertFilterOption = await screen.findByTestId('Dessert-category-filter');
    fireEvent.click(dessertFilterOption);
    expect(mockFilterMealByDessert).toBeCalled();
    expect(mockFilterMealByDessert).toBeCalledTimes(1);
    const cards = await screen.findAllByRole('link', { name: /card-menu/i });
    expect(cards.length).toBe(maxDefaultCards);
    expect(cards.length).not.toBe(maxDefaultCards + 1);
    const { meals } = mealsFilterByDessert;
    await testMealsRecipeCard(meals, maxDefaultCards, cardTestId, titleTestId);
  });

  it(`If the recipes are for food and the category is "Goat", you must load the first 12 
  recipes of Goat`, async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas' });
    const mockFilterMealByGoat = mockFilterMealByCategory(mealsFilterByGoat);
    const goatFilterOption = await screen.findByTestId('Goat-category-filter');
    fireEvent.click(goatFilterOption);
    expect(mockFilterMealByGoat).toBeCalled();
    expect(mockFilterMealByGoat).toBeCalledTimes(1);
    const cards = await screen.findAllByRole('link', { name: /card-menu/i });
    expect(cards.length).toBe(1);
    expect(cards.length).not.toBe(1 + 1);
    const { meals } = mealsFilterByGoat;
    await testMealsRecipeCard(meals, 1, cardTestId, titleTestId);
  });

  it(`If the recipes are for drinks and the category is "Ordinary Drink", you must load 
  the first 12 recipes of Ordinary Drink`, async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });
    const mockFilterDrinkByOrdinaryDrink = mockFilterDrinkByCategory(
      drinksFilterByOrdinaryDrink,
    );
    const ordinaryDrinkFilterOption = await screen
      .findByTestId('Ordinary Drink-category-filter');
    fireEvent.click(ordinaryDrinkFilterOption);
    expect(mockFilterDrinkByOrdinaryDrink).toBeCalled();
    expect(mockFilterDrinkByOrdinaryDrink).toBeCalledTimes(1);
    const cards = await screen.findAllByRole('link', { name: /card-menu/i });
    expect(cards.length).toBe(maxDefaultCards);
    expect(cards.length).not.toBe(maxDefaultCards + 1);
    const { drinks } = drinksFilterByOrdinaryDrink;
    await testDrinksRecipeCard(drinks, maxDefaultCards, cardTestId, titleTestId);
  });

  it(`If the recipes are for drinks and the category is "Cocktail", the first 12 
  Cocktail recipes must be loaded`, async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });
    const mockFilterDrinkByCocktail = mockFilterDrinkByCategory(
      drinksFilterByCocktail,
    );
    const cocktailFilterOption = await screen
      .findByTestId('Cocktail-category-filter');
    fireEvent.click(cocktailFilterOption);
    expect(mockFilterDrinkByCocktail).toBeCalled();
    expect(mockFilterDrinkByCocktail).toBeCalledTimes(1);
    const cards = await screen.findAllByRole('link', { name: /card-menu/i });
    expect(cards.length).toBe(maxDefaultCards);
    expect(cards.length).not.toBe(maxDefaultCards + 1);
    const { drinks } = drinksFilterByCocktail;
    await testDrinksRecipeCard(drinks, maxDefaultCards, cardTestId, titleTestId);
  });

  it(`If the recipes are for drinks and the category is "Milk/Float/Shake", you must 
  load the first 12 recipes of Milk/Float/Shake`, async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });
    const mockFilterDrinkByMilkFloatShake = mockFilterDrinkByCategory(
      drinksFilterByMilkFloatShake,
    );
    const milkFloatShakeFilterOption = await screen
      .findByTestId('Milk / Float / Shake-category-filter');
    fireEvent.click(milkFloatShakeFilterOption);
    expect(mockFilterDrinkByMilkFloatShake).toBeCalled();
    expect(mockFilterDrinkByMilkFloatShake).toBeCalledTimes(1);
    const cards = await screen.findAllByRole('link', { name: /card-menu/i });
    expect(cards.length).toBe(maxDefaultCards);
    expect(cards.length).not.toBe(maxDefaultCards + 1);
    const { drinks } = drinksFilterByMilkFloatShake;
    await testDrinksRecipeCard(drinks, maxDefaultCards, cardTestId, titleTestId);
  });

  it(`If the recipes are for drinks and the category is "Other/Unknown", the first 12 
  recipes of Other/Unknown must be loaded`, async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });
    const mockFilterDrinkByOtherUnknown = mockFilterDrinkByCategory(
      drinksFilterByOtherUnknown,
    );
    const otherUnknownFilterOption = await screen
      .findByTestId('Other/Unknown-category-filter');
    fireEvent.click(otherUnknownFilterOption);
    expect(mockFilterDrinkByOtherUnknown).toBeCalled();
    expect(mockFilterDrinkByOtherUnknown).toBeCalledTimes(1);
    const cards = await screen.findAllByRole('link', { name: /card-menu/i });
    expect(cards.length).toBe(maxDefaultCards);
    expect(cards.length).not.toBe(maxDefaultCards + 1);
    const { drinks } = drinksFilterByOtherUnknown;
    await testDrinksRecipeCard(drinks, maxDefaultCards, cardTestId, titleTestId);
  });

  it(`If the recipes are for drinks and the category is "Cocoa", you must load the first 
  12 recipes of Cocoa`, async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });
    const mockFilterDrinkByCocoa = mockFilterDrinkByCategory(
      drinksFilterByCocoa,
    );
    const maxCocoaCards = 9;
    const cocoaFilterOption = await screen
      .findByTestId('Cocoa-category-filter');
    fireEvent.click(cocoaFilterOption);
    expect(mockFilterDrinkByCocoa).toBeCalled();
    expect(mockFilterDrinkByCocoa).toBeCalledTimes(1);
    const cards = await screen.findAllByRole('link', { name: /card-menu/i });
    expect(cards.length).toBe(maxCocoaCards);
    expect(cards.length).not.toBe(maxCocoaCards + 1);
    const { drinks } = drinksFilterByCocoa;
    await testDrinksRecipeCard(drinks, maxCocoaCards, cardTestId, titleTestId);
  });
});
