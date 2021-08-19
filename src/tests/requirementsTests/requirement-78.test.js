import React from 'react';
import { screen } from '@testing-library/react';
import { mealsFiltersOptions } from '../mocks/mockFilterOptions';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { testMealsRecipeCard } from '../helper/testRecipeCard';
import listAllMealsAreas from '../mocks/meals/mockListAllMealsAreas';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import App from '../../App';
import * as requestMenu from '../../services/requestMenu';

const maxDefaultCards = 12;
const cardTestId = '-recipe-card';
const titleTestId = '-card-name';

jest
  .spyOn(requestMenu, 'listAllMealsAreas')
  .mockImplementation(() => Promise.resolve(listAllMealsAreas));

jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

describe(`78 - Implement the explore by place of origin screen elements respecting the
attributes described in the prototype`, () => {
  it('The screen has the data-testids of all 12 cards and all source locations',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar/comidas/area' });

      const allCategoryFilters = screen.queryByTestId('All-category-filter');
      expect(allCategoryFilters).toBeNull();

      mealsFiltersOptions.meals.map(({ strCategory }) => {
        const categoryFilter = screen.queryByTestId(`${strCategory}-category-filter`);
        return expect(categoryFilter).toBeNull();
      });

      const exploreByAreaDropdown = await screen.findByTestId('explore-by-area-dropdown');
      expect(exploreByAreaDropdown).toBeInTheDocument();

      await Promise.all(
        listAllMealsAreas.meals.map(async ({ strArea }) => {
          const areaOption = await screen.findByTestId(`${strArea}-option`);
          expect(areaOption).toBeInTheDocument();
          expect(areaOption).toHaveTextContent(strArea);
        }),
      );

      const { meals } = mealsFiltersByAll;
      await testMealsRecipeCard(meals, maxDefaultCards, cardTestId, titleTestId);

      const twelfthFoodCardIngredient = screen.queryByTestId('12-recipe-card');
      const twelfthFoodCardIngredientImage = screen.queryByTestId('12-card-img');
      const twelfthFoodCardIngredientName = screen.queryByTestId('12-card-name');

      expect(twelfthFoodCardIngredient).not.toBeInTheDocument();
      expect(twelfthFoodCardIngredientImage).not.toBeInTheDocument();
      expect(twelfthFoodCardIngredientName).not.toBeInTheDocument();
    });
});
