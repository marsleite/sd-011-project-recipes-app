import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`72 - Redirect the user person by clicking on "Por Ingredientes", the route
should change to the explore by ingredients screen`, () => {
  it(`By clicking the "Por Ingredientes" button on the explore food screen the route
  changes to the explore foods by ingredient page`, async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/explorar/comidas' });

    const exploreByIngredient = await screen.findByTestId('explore-by-ingredient');
    fireEvent.click(exploreByIngredient);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });

  it(`By clicking on the "Explorar Bebidas" button from the explore drinks screen the
  route changes to the explore drinks by ingredient page`, async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/explorar/bebidas' });

    const exploreByIngredient = await screen.findByTestId('explore-by-ingredient');
    fireEvent.click(exploreByIngredient);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
});
