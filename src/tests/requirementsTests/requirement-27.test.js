import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions, drinksFiltersOptions } from '../mocks/mockFilterOptions';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
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

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe('27 - Implement the category buttons to be used as a filter',
  () => {
    it('If the recipes are for food, the first 5 food categories must be displayed',
      async () => {
        renderWithRouterAndStore(<App />, { route: '/comidas' });

        const beefFilterOption = await screen.findByTestId('Beef-category-filter');
        const breakfastFilterOption = await screen
          .findByTestId('Breakfast-category-filter');
        const chickenFilterOption = await screen.findByTestId('Chicken-category-filter');
        const dessertFilterOption = await screen.findByTestId('Dessert-category-filter');
        const goatFilterOption = await screen.findByTestId('Goat-category-filter');

        expect(beefFilterOption).toBeInTheDocument();
        expect(beefFilterOption).toHaveTextContent('Beef');
        expect(breakfastFilterOption).toBeInTheDocument();
        expect(breakfastFilterOption).toHaveTextContent('Breakfast');
        expect(chickenFilterOption).toBeInTheDocument();
        expect(chickenFilterOption).toHaveTextContent('Chicken');
        expect(dessertFilterOption).toBeInTheDocument();
        expect(dessertFilterOption).toHaveTextContent('Dessert');
        expect(goatFilterOption).toBeInTheDocument();
        expect(goatFilterOption).toHaveTextContent('Goat');

        const filterButtons = await screen.findAllByRole(
          'button',
          { name: 'filter-btn' },
        );

        const maxFilterButtons = 6;

        expect(filterButtons.length).toBe(maxFilterButtons);
        expect(filterButtons.length).not.toBe(maxFilterButtons + 1);
      });

    it('If the recipes are for food, the first 5 food categories must be displayed',
      async () => {
        renderWithRouterAndStore(<App />, { route: '/bebidas' });

        const ordinaryDrinkFilterOption = await screen
          .findByTestId('Ordinary Drink-category-filter');
        const cocktailFilterOption = await screen
          .findByTestId('Cocktail-category-filter');
        const milkFloatShakeFilterOption = await screen
          .findByTestId('Milk / Float / Shake-category-filter');
        const otherUnknownFilterOption = await screen
          .findByTestId('Other/Unknown-category-filter');
        const cocoaFilterOption = await screen.findByTestId('Cocoa-category-filter');

        expect(ordinaryDrinkFilterOption).toBeInTheDocument();
        expect(ordinaryDrinkFilterOption).toHaveTextContent('Ordinary Drink');
        expect(cocktailFilterOption).toBeInTheDocument();
        expect(cocktailFilterOption).toHaveTextContent('Cocktail');
        expect(milkFloatShakeFilterOption).toBeInTheDocument();
        expect(milkFloatShakeFilterOption).toHaveTextContent('Milk / Float / Shake');
        expect(otherUnknownFilterOption).toBeInTheDocument();
        expect(otherUnknownFilterOption).toHaveTextContent('Other/Unknown');
        expect(cocoaFilterOption).toBeInTheDocument();
        expect(cocoaFilterOption).toHaveTextContent('Cocoa');

        const filterButtons = await screen.findAllByRole(
          'button',
          { name: 'filter-btn' },
        );

        const maxFilterButtons = 6;

        expect(filterButtons.length).toBe(maxFilterButtons);
        expect(filterButtons.length).not.toBe(maxFilterButtons + 1);
      });
  });
