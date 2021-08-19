import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { testMealsRecipeCard } from '../helper/testRecipeCard';
import listAllMealsAreas from '../mocks/meals/mockListAllMealsAreas';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import americanMeals from '../mocks/meals/mockAmericanMeals';
import canadianMeals from '../mocks/meals/mockCanadianMeals';
import App from '../../App';
import * as requestMenu from '../../services/requestMenu';

const maxDefaultCards = 12;
const cardTestId = '-recipe-card';
const titleTestId = '-card-name';
const exploreByAreaPath = '/explorar/comidas/area';

const mockListAllMealsAreas = jest
  .spyOn(requestMenu, 'listAllMealsAreas')
  .mockImplementation(() => Promise.resolve(listAllMealsAreas));

const mockSearchMealByName = jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

const mockListMealsByArea = jest
  .spyOn(requestMenu, 'listMealsByArea')
  .mockImplementationOnce(() => Promise.resolve(americanMeals))
  .mockImplementationOnce(() => Promise.resolve(canadianMeals));

beforeEach(() => jest.clearAllMocks());
afterEach(() => jest.clearAllMocks());

describe(`79 - Develop the same specs as the main recipe screen, except that category
filters are replaced by a dropdown`, () => {
  it('The first 12 food recipes must be loaded',
    async () => {
      renderWithRouterAndStore(<App />, { route: exploreByAreaPath });

      expect(mockListAllMealsAreas).toHaveBeenCalled();
      expect(mockListAllMealsAreas).toHaveBeenCalledTimes(1);

      expect(mockSearchMealByName).toHaveBeenCalled();
      expect(mockSearchMealByName).toHaveBeenCalledTimes(1);

      const { meals } = mealsFiltersByAll;
      await testMealsRecipeCard(meals, maxDefaultCards, cardTestId, titleTestId);

      const twelfthFoodCardIngredient = screen.queryByTestId('12-recipe-card');
      const twelfthFoodCardIngredientImage = screen.queryByTestId('12-card-img');
      const twelfthFoodCardIngredientName = screen.queryByTestId('12-card-name');

      expect(twelfthFoodCardIngredient).not.toBeInTheDocument();
      expect(twelfthFoodCardIngredientImage).not.toBeInTheDocument();
      expect(twelfthFoodCardIngredientName).not.toBeInTheDocument();
    });

  it(`When selecting a place-of-origin filter, all recipes must switch to filtered API
  data.`, async () => {
    renderWithRouterAndStore(<App />, { route: exploreByAreaPath });

    const exploreByAreaDropdown = await screen.findByTestId('explore-by-area-dropdown');

    fireEvent.change(exploreByAreaDropdown, { target: { value: 'American' } });

    expect(mockListMealsByArea).toHaveBeenCalled();
    expect(mockListMealsByArea).toHaveBeenCalledTimes(1);

    const { meals: americanMealsList } = americanMeals;
    await testMealsRecipeCard(
      americanMealsList, maxDefaultCards, cardTestId, titleTestId,
    );

    fireEvent.change(exploreByAreaDropdown, { target: { value: 'Canadian' } });

    expect(mockListMealsByArea).toHaveBeenCalled();
    expect(mockListMealsByArea).toHaveBeenCalledTimes(2);

    const { meals: canadianMealsList } = canadianMeals;
    await testMealsRecipeCard(
      canadianMealsList, maxDefaultCards, cardTestId, titleTestId,
    );
  });

  it(`By clicking on the card, the route should change to the recipe details screen with
  its ID in the URL`, async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: exploreByAreaPath });

    const firstRecipeCard = await screen.findByTestId('0-recipe-card');
    fireEvent.click(firstRecipeCard);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas/52977');
  });
});
