import React from 'react';
import { screen } from '@testing-library/react';
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

describe('83 - Implement the solution so that the user\'s email must be visible', () => {
  it('The email stored in localStorage is visible', () => {
    renderWithRouterAndStore(<App />, { route: '/perfil' });

    const profileEmail = screen.getByTestId('profile-email');

    expect(profileEmail).toHaveTextContent('email@mail.com');
  });
});
