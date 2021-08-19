import userEvent from '@testing-library/user-event';
import React from 'react';
import Comidas from '../pages/Comidas';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const mealsAmount = 12; // no magic numbers
const breakfastIdTest = 'Breakfast-category-filter';
const buttonIdTest = 'All-category-filter';

describe('testa se a página de comidas é renderizada', () => {
  test('testa a rota da página de comidas', async () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<Comidas />);
    history.push('/comidas');

    const buttonAll = await getByTestId(buttonIdTest);
    userEvent.click(buttonAll);
    const path = history.location.pathname;

    expect(path).toBe('/comidas');
  });

  test('testa a quantidade dos cards de comida', async () => {
    const {
      history, findByText, findAllByTestId } = renderWithRouterAndRedux(<Comidas />);
    history.push('/comidas');

    const meal = await findByText(/lasagne/i);
    expect(meal).toBeInTheDocument();

    const cardsMeal = await findAllByTestId(/recipe-card/i);
    expect(cardsMeal.length).toBe(mealsAmount);

    cardsMeal.forEach((mealCard) => {
      expect(mealCard).toBeInTheDocument();
    });
  });

  test('testa se os filtros da página de comidas são renderizados', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<Comidas />);
    history.push('/comidas');

    const buttonAll = await findByTestId(buttonIdTest);
    expect(buttonAll).toBeInTheDocument(buttonIdTest);

    const btnBreakast = await findByTestId(breakfastIdTest);
    expect(btnBreakast).toBeInTheDocument(breakfastIdTest);

    const btnChicken = await findByTestId('Chicken-category-filter');
    expect(btnChicken).toBeInTheDocument('Chicken-category-filter');

    const btnDessert = await findByTestId('Dessert-category-filter');
    expect(btnDessert).toBeInTheDocument('Dessert-category-filter');

    const btnGoat = await findByTestId('Goat-category-filter');
    expect(btnGoat).toBeInTheDocument('Goat-category-filter');

    const btnBeef = await findByTestId('Beef-category-filter');
    expect(btnBeef).toBeInTheDocument('Beef-category-filter');
  });

  test('testa o click em um botão da categoria', async () => {
    const { history, findByTestId, findByText } = renderWithRouterAndRedux(<Comidas />);
    history.push('/comidas');

    const breakfastButton = await findByTestId(breakfastIdTest);
    userEvent.click(breakfastButton);
    const text = await findByText('English Breakfast');
    expect(text).toBeInTheDocument();
  });
});
