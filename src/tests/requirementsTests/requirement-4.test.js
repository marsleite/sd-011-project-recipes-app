import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`4 - Design the screen so that the person should be able to write their
password in the password input`, () => {
  it('It is possible to write the password', async () => {
    renderWithRouterAndStore(<App />, { route: '/' });

    const passwordInput = await screen.findByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(passwordInput).toHaveValue('1234567');
  });
});
