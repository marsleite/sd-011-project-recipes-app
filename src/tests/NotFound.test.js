import React from 'react';
import NotFound from '../pages/NotFound';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testa a página NotFound ', () => {
  test('testa a rota', () => {
    const { history, getByText } = renderWithRouterAndRedux(<NotFound />);
    history.push('/bebidas/kndued');
    const notFound = getByText(/Not Found/i);
    expect(notFound).toBeInTheDocument();
  });
});
