import userEvent from '@testing-library/user-event';
import React from 'react';
import Comidas from '../pages/Comidas';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const mealsAmount = 12; // no magic numbers
const breakfastIdTest = 'Breakfast-category-filter';
const buttonIdTest = 'All-category-filter';

describe('tests meal page ', () => {
  test('tests route', async () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<Comidas />);
    history.push('/comidas');

    const buttonAll = await getByTestId(buttonIdTest);
    userEvent.click(buttonAll);
    const path = history.location.pathname;

    expect(path).toBe('/comidas');
  });

  test('tests meal cards quantity', async () => {
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

  test('tests filter by categories buttons render', async () => {
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

  test('tests clicking on a category button', async () => {
    const { history, findByTestId, findByText } = renderWithRouterAndRedux(<Comidas />);
    history.push('/comidas');

    const breakfastButton = await findByTestId(breakfastIdTest);
    userEvent.click(breakfastButton);
    const text = await findByText('English Breakfast');
    expect(text).toBeInTheDocument();
  });
});
