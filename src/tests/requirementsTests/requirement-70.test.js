import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`70 - Implement the screen elements of exploring drinks or food respecting the
attributes described in the prototype`, () => {
  it('Have the correct data-testids for the food explore screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/comidas' });

    const exploreByIngredient = await screen.findByTestId('explore-by-ingredient');
    const exploreByArea = await screen.findByTestId('explore-by-area');
    const exploreBySurprise = await screen.findByTestId('explore-surprise');

    expect(exploreByIngredient).toBeInTheDocument();
    expect(exploreByArea).toBeInTheDocument();
    expect(exploreBySurprise).toBeInTheDocument();
  });

  it('It has the correct data-testids for the drink explore screen', async () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/bebidas' });

    const exploreByIngredient = await screen.findByTestId('explore-by-ingredient');
    const exploreByArea = screen.queryByTestId('explore-by-area');
    const exploreBySurprise = await screen.findByTestId('explore-surprise');

    expect(exploreByIngredient).toBeInTheDocument();
    expect(exploreByArea).not.toBeInTheDocument();
    expect(exploreBySurprise).toBeInTheDocument();
  });
});
