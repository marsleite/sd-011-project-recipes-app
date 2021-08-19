import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent, wait } from '@testing-library/react';
import renderWithRouterAndStore from './renderWithRouterAndStore';
import meals from '../../cypress/mocks/meals';
import categories from '../../cypress/mocks/mealCategories';
import Comidas from '../pages/comidas';

const testHistory = createMemoryHistory({ initialEntries: ['/perfil'] });
const TWELVE = 12;
const BEEF_CATEGORY_FILTER = 'Beef-category-filter';
const CHICKEN_CATEGORY_FILTER = 'Chicken-category-filter';

describe('Testa a tela de comidas', () => {
  const mealResponse = {
    json: jest.fn().mockResolvedValue(meals),
  };
  const mockMeal = jest.spyOn(global, 'fetch');
  mockMeal.mockResolvedValueOnce(mealResponse);

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

  it('Testa se a tela renderiza os componentes corretamente', async () => {
    const {
      container,
      findByTestId,
      findByText,
      getByTestId,
    } = renderWithRouterAndStore(<Comidas />, testHistory, initialState);
    const cards = await container.querySelectorAll('.card-item');
    const beefFilter = await findByTestId(BEEF_CATEGORY_FILTER);
    const chickenFilter = await findByTestId(CHICKEN_CATEGORY_FILTER);
    const recipe = await findByText(/Kumpir/i);

    expect(recipe).toBeInTheDocument();
    expect(cards.length).toEqual(TWELVE);

    // fireEvent.click(chickenFilter);

    expect(recipe).not.toBeInTheDocument();
  });
});
