import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`2 - Create all elements that must respect the attributes described in the
prototype for the login screen`, () => {
  it('It has the data-testids email-input, password-input and login-submit-btn',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/' });

      const emailInput = await screen.findByTestId('email-input');
      const passwordInput = await screen.findByTestId('password-input');
      const loginSubmitBtn = await screen.findByTestId('login-submit-btn');

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginSubmitBtn).toBeInTheDocument();
    });
});
