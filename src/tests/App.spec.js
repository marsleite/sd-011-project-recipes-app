import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

const EMAIL_INPUT = 'email-input';

describe('6 - Testando App', () => {
  it('Inicializando App', () => {
    const { getByTestId } = render(<App />);
    const emailInput = getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
  });
});
