import React from 'react';
import { screen, cleanup, fireEvent, queryByTestId } from '@testing-library/react';
import { renderWithRouterAndStore } from './helper/testConfig';
import Login from '../pages/Login';

describe('Should not have a <Header /> component in the login screen', () => {
  it('Cant have a <Header /> component', () => {
    renderWithRouterAndStore(<Login />);
    expect(queryByTestId(document.documentElement, 'profile-top-btn'))
      .not.toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'page-title'))
      .not.toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'search-top-btn'))
      .not.toBeInTheDocument();
  });
});

describe('Login Page tests', () => {
  beforeEach(cleanup);

  it('Verify inputs and button IDs', () => {
    renderWithRouterAndStore(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Verify food page redirect', () => {
    const { history } = renderWithRouterAndStore(<Login />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(button).toHaveAttribute('disabled');

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    expect(button).not.toHaveAttribute('disabled');

    fireEvent.click(button);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas');
  });
});
