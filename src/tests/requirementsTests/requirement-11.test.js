import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
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

describe('11 - Redirect the user to the profile screen by clicking the profile button',
  () => {
    it('Screen change occurs correctly', async () => {
      const { history } = renderWithRouterAndStore(<App />, { route: '/comidas' });

      const pageTitle = await screen.findByTestId('page-title');
      expect(pageTitle).toBeInTheDocument();
      expect(pageTitle).toHaveTextContent('Comidas');

      const profileTopBtn = await screen.findByTestId('profile-top-btn');
      fireEvent.click(profileTopBtn);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/perfil');
    });
  });
