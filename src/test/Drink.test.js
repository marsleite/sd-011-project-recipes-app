import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import renderWithRouterAndStore from './renderWithRouterAndStore';
import drinks from '../../cypress/mocks/drinks';
import categories from '../../cypress/mocks/drinkCategories';
import Drinks from '../pages/bebidas';

const testHistory = createMemoryHistory({ initialEntries: ['/perfil'] });
const TWELVE = '12';

describe('Testa a tela de comidas', () => {
  const drinkResponse = {
    json: jest.fn().mockResolvedValue(drinks),
  };
  const mockDrink = jest.spyOn(global, 'fetch');
  mockDrink.mockResolvedValueOnce(drinkResponse);

  const categoryResponse = {
    json: jest.fn().mockResolvedValue(categories),
  };
  const mockCategory = jest.spyOn(global, 'fetch');
  mockCategory.mockResolvedValueOnce(categoryResponse);

  const initialState = {
    recipes: {
      allRecipes: meals.meals.splice(0, TWELVE),
      allCategories: categories.meals,
    },
  };

  it('Testa se a tela renderiza os componentes corretamente', () => {
    const {
      getByTestId,
    } = renderWithRouterAndStore(<Drinks />, testHistory, initialState);
  });
});
