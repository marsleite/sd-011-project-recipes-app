import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe('81 - Implement the route that should just be "/explorar/comidas/area"', () => {
  it('When accessing the route it returns a "Not Found" error', () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/bebidas/area' });

    const notFoundError = screen.getByText('Not Found');
    expect(notFoundError).toBeInTheDocument();
  });
});
