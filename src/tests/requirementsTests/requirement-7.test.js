import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`7 - Save the user person's email in localStorage in the user key after
submission`, () => {
  it('After submission, the user key must be saved in localStorage', async () => {
    renderWithRouterAndStore(<App />, { route: '/' });
    localStorage.clear();

    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');
    const loginSubmitBtn = await screen.findByTestId('login-submit-btn');

    expect(loginSubmitBtn).toBeDisabled();

    expect(localStorage.getItem('user')).toBeNull();

    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(loginSubmitBtn);

    expect(JSON.parse(localStorage.getItem('user')))
      .toStrictEqual({ email: 'email@mail.com' });
    localStorage.clear();
  });
});
