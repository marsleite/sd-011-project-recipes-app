import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`3 - Design the screen so that the person should be able to write their
email in the email input`, () => {
  it('It is possible to write the email', async () => {
    renderWithRouterAndStore(<App />, { route: '/' });

    const emailInput = await screen.findByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });

    expect(emailInput).toHaveValue('email@mail.com');
  });
});
