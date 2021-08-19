import userEvent from '@testing-library/user-event';
import React from 'react';
import Bebidas from '../pages/Bebidas';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const drinksAmount = 12;
const btnDrinkId = 'Ordinary Drink-category-filter';
const btnAll = 'All-category-filter';

describe('testa a página de bebidas ', () => {
  test('testa a rota', async () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<Bebidas />);
    history.push('/bebidas');
    const allButton = await getByTestId(btnAll);
    userEvent.click(allButton);
    const path = history.location.pathname;

    expect(path).toBe('/bebidas');
  });

  test('testa a quantidade de cards de bebidas', async () => {
    const {
      history, findByText, findAllByTestId } = renderWithRouterAndRedux(<Bebidas />);
    history.push('/bebidas');

    const drink = await findByText(/B-53/i);
    expect(drink).toBeInTheDocument();

    const cardDrinks = await findAllByTestId(/recipe-card/i);
    expect(cardDrinks.length).toBe(drinksAmount);

    cardDrinks.forEach((drinkCard) => {
      expect(drinkCard).toBeInTheDocument();
    });
  });

  test('testa se os filtros de categorias de bebidas são renderizados', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<Bebidas />);
    history.push('/bebidas');

    const buttonAll = await findByTestId(btnAll);
    expect(buttonAll).toBeInTheDocument(btnAll);

    const btnOrdinary = await findByTestId(btnDrinkId);
    expect(btnOrdinary).toBeInTheDocument(btnDrinkId);

    const btnCocktail = await findByTestId('Cocktail-category-filter');
    expect(btnCocktail).toBeInTheDocument('Cocktail-category-filter');

    const btnMilk = await findByTestId('Milk / Float / Shake-category-filter');
    expect(btnMilk).toBeInTheDocument('Milk / Float / Shake-category-filter');

    const btnOther = await findByTestId('Other/Unknown-category-filter');
    expect(btnOther).toBeInTheDocument('Other/Unknown-category-filter');

    const btnCocoa = await findByTestId('Cocoa-category-filter');
    expect(btnCocoa).toBeInTheDocument('Cocoa-category-filter');
  });

  test('testa o click em um botão da categoria', async () => {
    const { history, findByTestId, findByText } = renderWithRouterAndRedux(<Bebidas />);
    history.push('/bebidas');

    const btnOrdinary = await findByTestId(btnDrinkId);
    userEvent.click(btnOrdinary);
    const text = await findByText('A Day at the Beach');
    expect(text).toBeInTheDocument();
  });
});
