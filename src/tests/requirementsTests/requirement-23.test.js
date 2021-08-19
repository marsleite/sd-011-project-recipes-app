import React from 'react';
import { screen, fireEvent, wait } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import { mealsFiltersOptions } from '../mocks/mockFilterOptions';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import * as requestMenu from '../../services/requestMenu';
import App from '../../App';

jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

jest
  .spyOn(requestMenu, 'requestAllMealCategories')
  .mockImplementation(() => Promise.resolve(mealsFiltersOptions));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe('23 - Redirect the user to the explore screen by clicking the explore icon',
  () => {
    it('Redirects to correct route', async () => {
      const { history } = renderWithRouterAndStore(<App />, { route: '/comidas' });

      fireEvent.click(await screen.findByTestId('explore-bottom-btn'));

      const { location: { pathname } } = history;
      await wait(() => expect(pathname).toBe('/explorar'));
    });
  });
