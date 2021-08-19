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

describe(`80 - Implement the dropdown so that all areas returned from the API must be
available, including the "All" option, which returns recipes without any filter`, () => {
  it(`In the dropdown all areas returned from the API must be available, including the
  option "All"`, async () => {
    renderWithRouterAndStore(<App />, { route: exploreByAreaPath });

    const allOption = await screen.findByTestId('All-option');
    expect(allOption).toBeInTheDocument();

    await Promise.all(
      listAllMealsAreas.meals.map(async ({ strArea }) => {
        const areaOption = await screen.findByTestId(`${strArea}-option`);
        expect(areaOption).toBeInTheDocument();
        expect(areaOption).toHaveTextContent(strArea);
      }),
    );
  });

  it('The "All" option returns recipes without any filter', async () => {
    renderWithRouterAndStore(<App />, { route: exploreByAreaPath });

    expect(mockSearchMealByName).toHaveBeenCalled();
    expect(mockSearchMealByName).toHaveBeenCalledTimes(1);

    const exploreByAreaDropdown = await screen.findByTestId('explore-by-area-dropdown');

    fireEvent.change(exploreByAreaDropdown, { target: { value: 'American' } });

    expect(mockListAllMealsAreas).toHaveBeenCalled();
    expect(mockListAllMealsAreas).toHaveBeenCalledTimes(1);

    expect(mockListMealsByArea).toHaveBeenCalled();
    expect(mockListMealsByArea).toHaveBeenCalledTimes(1);

    const { meals: americanMealsList } = americanMeals;
    await testMealsRecipeCard(
      americanMealsList, maxDefaultCards, cardTestId, titleTestId,
    );

    fireEvent.change(exploreByAreaDropdown, { target: { value: 'All' } });

    expect(mockSearchMealByName).toHaveBeenCalled();
    expect(mockSearchMealByName).toHaveBeenCalledTimes(2);

    const { meals } = mealsFiltersByAll;
    await testMealsRecipeCard(
      meals, maxDefaultCards, cardTestId, titleTestId,
    );
  });
});
