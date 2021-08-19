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

describe(`85 - Redirect the user that, when clicking on the "Receitas Favoritas" button, 
the route should change to the favorite recipes screen`, () => {
  it('Redirects to correct route', () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/perfil' });

    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    fireEvent.click(profileDoneBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/receitas-feitas');
  });
});
