import userEvent from '@testing-library/user-event';
import React from 'react';
import IngredienteBebida from '../pages/IngredienteBebida';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const drinkAmount = 12;
const pathIngredient = '/explorar/bebidas/ingredientes';

describe('testa a pagina Ingrediente Bebida ', () => {
  test('testa se a rota está correta', async () => {
    const { history } = renderWithRouterAndRedux(<IngredienteBebida />);
    history.push(pathIngredient);
  });
  test('testa se a página contém o título "Explorar Ingredientes"', async () => {
    const { findByTestId } = renderWithRouterAndRedux(<IngredienteBebida />);
    const title = await findByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('testa se a página renderiza todos os cards', async () => {
    const {
      findByText, findAllByTestId,
    } = renderWithRouterAndRedux(<IngredienteBebida />);

    const drink = await findByText(/Light rum/i);
    expect(drink).toBeInTheDocument();

    const drinkMeals = await findAllByTestId(/ingredient-card/i);
    expect(drinkMeals.length).toBe(drinkAmount);

    drinkMeals.forEach((drinksCard) => {
      expect(drinksCard).toBeInTheDocument();
    });
  });
  test('testa se clicando no nome da comida, é redirecionado para'
    + ' página de bebidas', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<IngredienteBebida />);
    history.push(pathIngredient);
    const lightRumCard = await findByTestId('0-ingredient-card');
    userEvent.click(lightRumCard);
    const path = history.location.pathname;
    expect(path).toBe('/bebidas');
  });
});
