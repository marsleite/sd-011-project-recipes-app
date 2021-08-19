import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`68 - Design the screen so that it has 2 buttons: one for exploring food and the
other for exploring drinks`, () => {
  it('Button names should be "Explorar Comidas" and "Explorar Bebidas"', async () => {
    renderWithRouterAndStore(<App />, { route: '/explorar' });

    const exploreFood = await screen.findByTestId('explore-food');
    const exploreDrinks = await screen.findByTestId('explore-drinks');

    expect(exploreFood).toHaveTextContent('Explorar Comidas');
    expect(exploreDrinks).toHaveTextContent('Explorar Bebidas');
  });
});
