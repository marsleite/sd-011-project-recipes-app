import userEvent from '@testing-library/user-event';
import React from 'react';
import Explorar from '../pages/Explorar';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testa a pagina ComidasArea ', () => {
  test('testa se a rota está correta', async () => {
    const { history } = renderWithRouterAndRedux(<Explorar />);
    history.push('/explorar');
  });
  test('testa se a página contém o título "Explorar"', async () => {
    const { findByTestId } = renderWithRouterAndRedux(<Explorar />);
    const title = await findByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('testa se clicando no botão "Explorar Comidas" é redirecionado'
  + 'para explorar/comidas', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<Explorar />);
    const exploreFood = await findByTestId('explore-food');
    userEvent.click(exploreFood);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas');
  });
  test('testa se clicando no botão "Explorar Bebidas" é redirecionado'
  + 'para explorar/bebidas', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<Explorar />);
    const exploreDrinks = await findByTestId('explore-drinks');
    userEvent.click(exploreDrinks);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/bebidas');
  });
});
