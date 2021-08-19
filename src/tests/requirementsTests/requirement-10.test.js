import React from 'react';
import { screen } from '@testing-library/react';
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

const profileTopBtnTestId = 'profile-top-btn';
const pageTitleTestId = 'page-title';
const searchtopBtnTestId = 'search-top-btn';

describe(`10 - Implement an icon for the profile screen, a title and an icon for the
search if it exists in the prototype`, () => {
  const hasNoHeader = async () => {
    const profileTopBtn = screen.queryByTestId(profileTopBtnTestId);
    const pageTitle = screen.queryByTestId(pageTitleTestId);
    const searchtopBtn = screen.queryByTestId(searchtopBtnTestId);

    expect(profileTopBtn).toBeNull();
    expect(pageTitle).toBeNull();
    expect(searchtopBtn).toBeNull();
  };

  const hasHeader = async (title, withSearchButton = true) => {
    const profileTopBtn = await screen.findByTestId(profileTopBtnTestId);
    const pageTitle = await screen.findByTestId(pageTitleTestId);

    expect(profileTopBtn).toBeInTheDocument();
    expect(profileTopBtn).toHaveAttribute('src', expect.stringContaining('profileIcon'));
    expect(pageTitle).toHaveTextContent(title);

    if (withSearchButton) {
      const searchtopBtn = await screen.findByTestId(searchtopBtnTestId);

      expect(searchtopBtn).toBeInTheDocument();
      expect(searchtopBtn).toHaveAttribute('src', expect.stringContaining('searchIcon'));
    } else {
      const searchtopBtnToBeNull = screen.queryByTestId(searchtopBtnTestId);

      expect(searchtopBtnToBeNull).toBeNull();
    }
  };

  it('There is no header on the login screen', () => {
    renderWithRouterAndStore(<App />, { route: '/' });

    hasNoHeader();
  });

  it('The header has the correct icons on the main food recipe screen',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/comidas' });

      await hasHeader('Comidas');
    });

  it('The header has the correct icons on the main drink recipe screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas' });

    await hasHeader('Bebidas');
  });

  it('There is no header in the details screen of a food recipe', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas/52771' });

    await hasNoHeader();
  });

  it('There is no header in the details screen of a drink recipe', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas/178319' });

    await hasNoHeader();
  });

  it('There is no header on the recipe screen in the food process', async () => {
    renderWithRouterAndStore(<App />, { route: '/comidas/52771/in-progress' });

    await hasNoHeader();
  });

  it('There is no header on the recipe screen in the drinks process', async () => {
    renderWithRouterAndStore(<App />, { route: '/bebidas/178319/in-progress' });

    await hasNoHeader();
  });

  it('The header has the correct icons on the explore screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/explorar' });

    await hasHeader('Explorar', false);
  });

  it('The header has the correct icons on the explore food screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/comidas' });

    await hasHeader('Explorar Comidas', false);
  });

  it('The header has the correct icons on the explore drinks screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/bebidas' });

    await hasHeader('Explorar Bebidas', false);
  });

  it('The header has the correct icons on the explore foods by ingredient screen',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar/comidas/ingredientes' });

      await hasHeader('Explorar Ingredientes', false);
    });

  it('The header has the correct icons on the explore drinks by ingredient screen',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar/bebidas/ingredientes' });

      await hasHeader('Explorar Ingredientes', false);
    });

  it('The header has the correct icons on the screen to explore foods by place of origin',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar/comidas/area' });

      await hasHeader('Explorar Origem');
    });

  it('The header has the correct icons on the profile screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/perfil' });

    await hasHeader('Perfil', false);
  });

  it('The header has the correct icons on the recipes made screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/receitas-feitas' });

    await hasHeader('Receitas Feitas', false);
  });

  it('The header has the correct icons on the favorite recipes screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/receitas-favoritas' });

    await hasHeader('Receitas Favoritas', false);
  });
});
