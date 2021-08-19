import React from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { SearchBarProvider } from '../context/SearchBar';
import Foods from '../pages/foods/Foods';
import meals from '../../cypress/mocks/meals';
import mealsCategories from '../../cypress/mocks/mealCategories';

const mockFetchMeals = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(meals),
    }));
};

const mockFetchCategories = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mealsCategories),
    }));
};

describe('Testa a tela <Foods.js />', () => {
  beforeAll(mockFetchMeals, mockFetchCategories);
  beforeEach(cleanup);
  it('A tela de comida possui header', () => {
    const screenFoods = render(<Foods />, { wrapper: SearchBarProvider }); // pra ilustrar outra forma de renderizar o Foods
    screenFoods.getByText(/Explorar Comidas/);
    screenFoods.getByTestId('profile-top-btn');
    // screenFoods.getByTestId('search-top-btn');
  });

  it('A tela de comida possui footer', () => {
    const screenFoods = render(<Foods />, { wrapper: SearchBarProvider });
    screenFoods.getByTestId('food-bottom-btn');
    screenFoods.getByTestId('drinks-bottom-btn');
    screenFoods.getByTestId('explore-bottom-btn');
  });

  it('Possui os cards', async () => {
    await act(async () => {
      render(<Foods />, { wrapper: SearchBarProvider });
    });
    expect(await screen.getByTestId('Vegetarian-category-filter')).toBeInTheDocument();
    expect(await screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    expect(await screen.getByText('Corba')).toBeInTheDocument();
    const buttonSearch = await screen.getByTestId('search-top-btn');
    fireEvent.click(buttonSearch);
    // expect(await screen.getByTestId('search-input')).toBeInTheDocument();
    // expect(await screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(await screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(await screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    // const inputSearch = await screen.getByTestId('search-input');
    // fireEvent.change(inputSearch, { target: { value: 'rice' } });
    // expect(inputSearch.value).toBe('rice');
    // fireEvent.click(screen.getByTestId('ingredient-search-radio'));
    fireEvent.click(screen.getByTestId('exec-search-btn'));
  });
  it('Possui os botão search', async () => {
    await act(async () => {
      render(<Foods />, { wrapper: SearchBarProvider });
    });
    const buttonSearch = await screen.getByTestId('search-top-btn');
    fireEvent.click(buttonSearch);
    expect(await screen.getByTestId('search-input')).toBeInTheDocument();
    expect(await screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(await screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(await screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    const inputSearch = await screen.getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'rice' } });
    expect(inputSearch.value).toBe('rice');
    fireEvent.click(screen.getByTestId('ingredient-search-radio'));
    fireEvent.click(screen.getByTestId('exec-search-btn'));
  });
});
