import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`6 - Save 2 tokens to the localStorage after submission, identified by the
mealsToken and cocktailsToken keys`, () => {
  it('After mealsToken and cocktailsToken submission must be saved in localStorage',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/' });
      localStorage.clear();

      const emailInput = await screen.findByTestId('email-input');
      const passwordInput = await screen.findByTestId('password-input');
      const loginSubmitBtn = await screen.findByTestId('login-submit-btn');

      expect(loginSubmitBtn).toBeDisabled();

      expect(localStorage.getItem('mealsToken')).toBeNull();
      expect(localStorage.getItem('cocktailsToken')).toBeNull();

      fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
      fireEvent.change(passwordInput, { target: { value: '1234567' } });
      fireEvent.click(loginSubmitBtn);

      expect(localStorage.getItem('mealsToken')).toBe('1');
      expect(localStorage.getItem('cocktailsToken')).toBe('1');
      localStorage.clear();
    });
});
