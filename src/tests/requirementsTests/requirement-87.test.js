import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

beforeEach(() => {
  localStorage.setItem('user', '{ "email": "email@mail.com" }');
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem('doneRecipes', '[]');
  localStorage.setItem('favoriteRecipes', '[]');
  localStorage.setItem('inProgressRecipes', '{}');
});

afterEach(() => {
  localStorage.clear();
});

describe(`87 - Redirect the user that, when clicking the "Sair" button, the 
'localStorage' should be cleared and the route should change to the login screen`,
() => {
  it('Clear all keys from localStorage', () => {
    renderWithRouterAndStore(<App />, { route: '/perfil' });

    expect(localStorage.getItem('user')).toEqual('{ "email": "email@mail.com" }');
    expect(localStorage.getItem('mealsToken')).toEqual('1');
    expect(localStorage.getItem('cocktailsToken')).toEqual('1');
    expect(localStorage.getItem('doneRecipes')).toEqual('[]');
    expect(localStorage.getItem('favoriteRecipes')).toEqual('[]');
    expect(localStorage.getItem('inProgressRecipes')).toEqual('{}');

    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    fireEvent.click(profileLogoutBtn);

    expect(localStorage.getItem('email')).toBeNull();
    expect(localStorage.getItem('mealsToken')).toBeNull();
    expect(localStorage.getItem('cocktailsToken')).toBeNull();
    expect(localStorage.getItem('doneRecipes')).toBeNull();
    expect(localStorage.getItem('favoriteRecipes')).toBeNull();
    expect(localStorage.getItem('inProgressRecipes')).toBeNull();
  });

  it('Route changes to login screen', () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/perfil' });

    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    fireEvent.click(profileLogoutBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
