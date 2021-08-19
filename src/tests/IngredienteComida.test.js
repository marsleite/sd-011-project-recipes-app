import userEvent from '@testing-library/user-event';
import React from 'react';
import IngredienteComida from '../pages/IngredienteComida';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const mealsAmount = 12;
const pathIngredient = '/explorar/comidas/ingredientes';

describe('testa a pagina Ingrediente Comida ', () => {
  test('testa se a rota está correta', async () => {
    const { history } = renderWithRouterAndRedux(<IngredienteComida />);
    history.push(pathIngredient);
  });
  test('testa se a página contém o título "Explorar Ingredientes"', async () => {
    const { findByTestId } = renderWithRouterAndRedux(<IngredienteComida />);
    const title = await findByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('testa se a página renderiza todos os cards', async () => {
    const {
      findByText, findAllByTestId,
    } = renderWithRouterAndRedux(<IngredienteComida />);

    const meal = await findByText(/Chicken/i);
    expect(meal).toBeInTheDocument();

    const cardMeals = await findAllByTestId(/ingredient-card/i);
    expect(cardMeals.length).toBe(mealsAmount);

    cardMeals.forEach((mealsCard) => {
      expect(mealsCard).toBeInTheDocument();
    });
  });
  test('testa se clicando no nome da comida, é redirecionado para'
    + ' página de comidas', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<IngredienteComida />);
    history.push(pathIngredient);
    const chickenCard = await findByTestId('0-ingredient-card');
    userEvent.click(chickenCard);
    const path = history.location.pathname;
    expect(path).toBe('/comidas');
  });
});
