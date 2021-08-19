import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

const emailInputTestId = 'email-input';
const passwordInputTestId = 'password-input';
const loginSubmitBtnTestId = 'login-submit-btn';

describe(`5 - Design the screen so that the form is only valid after a valid email
and password of more than 6 characters are filled.`, () => {
  it('Button must be disabled if email is invalid', async () => {
    renderWithRouterAndStore(<App />, { route: '/' });

    const emailInput = await screen.findByTestId(emailInputTestId);
    const passwordInput = await screen.findByTestId(passwordInputTestId);
    const loginSubmitBtn = await screen.findByTestId(loginSubmitBtnTestId);

    expect(loginSubmitBtn).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'email@mail' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(loginSubmitBtn).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'email.com' } });

    expect(loginSubmitBtn).toBeDisabled();
  });

  it('The button must be disabled if the password must be 6 characters or less',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/' });

      const emailInput = await screen.findByTestId(emailInputTestId);
      const passwordInput = await screen.findByTestId(passwordInputTestId);
      const loginSubmitBtn = await screen.findByTestId(loginSubmitBtnTestId);

      expect(loginSubmitBtn).toBeDisabled();

      fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });

      expect(loginSubmitBtn).toBeDisabled();
    });

  it('The button must be enabled if the email and password are valid', async () => {
    renderWithRouterAndStore(<App />, { route: '/' });

    const emailInput = await screen.findByTestId(emailInputTestId);
    const passwordInput = await screen.findByTestId(passwordInputTestId);
    const loginSubmitBtn = await screen.findByTestId(loginSubmitBtnTestId);

    expect(loginSubmitBtn).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(loginSubmitBtn).not.toBeDisabled();
  });
});
