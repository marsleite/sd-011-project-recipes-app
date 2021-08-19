import React from 'react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testa se a página Profile é renderizada', () => {
  test('testa se os botões são renderizados', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Profile />);

    const emailElement = getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();

    const btnDoneRecipes = getByTestId('profile-done-btn');
    expect(btnDoneRecipes).toBeInTheDocument();

    const favoriteBtn = getByTestId('profile-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const btnlogout = getByTestId('profile-logout-btn');
    expect(btnlogout).toBeInTheDocument();
  });
});

describe('testa a rota depois de clicar nos botões', () => {
  test('testa o botão de Receitas Feitas', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Profile />);
    const btnDoneRecipes = getByTestId('profile-done-btn');
    userEvent.click(btnDoneRecipes);
    const path = history.location.pathname;
    expect(path).toBe('/receitas-feitas');
  });
  test('testa o botão de Receitas Favoritas', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Profile />);
    const favoriteBtn = getByTestId('profile-favorite-btn');
    userEvent.click(favoriteBtn);
    const path = history.location.pathname;
    expect(path).toBe('/receitas-favoritas');
  });
  test('testa o botão de Logout', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<Profile />);
    const btnLogout = getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });
});
