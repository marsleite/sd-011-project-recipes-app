import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`8 - Redirect user to main food recipe screen after successful login submission
and validation`, () => {
  it('The route changes to the main food recipe screen', async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/' });
    localStorage.clear();

    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');
    const loginSubmitBtn = await screen.findByTestId('login-submit-btn');

    expect(loginSubmitBtn).toBeDisabled();

    expect(localStorage.getItem('user')).toBeNull();

    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(loginSubmitBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas');

    localStorage.clear();
  });
});
