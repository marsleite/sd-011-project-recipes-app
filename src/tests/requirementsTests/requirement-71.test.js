import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`71 - Develop 3 buttons: one to explore by ingredient, one to explore by place
of origin and one to get a random recipe`, () => {
  it(`It has the buttons "Por Ingredientes", "Por Local de Origem" and "Me Surpreenda!"
  to the food explore screen`, async () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/comidas' });

    const exploreByIngredient = await screen.findByTestId('explore-by-ingredient');
    const exploreByArea = await screen.findByTestId('explore-by-area');
    const exploreBySurprise = await screen.findByTestId('explore-surprise');

    expect(exploreByIngredient).toHaveTextContent('Por Ingredientes');
    expect(exploreByArea).toHaveTextContent('Por Local de Origem');
    expect(exploreBySurprise).toHaveTextContent('Me Surpreenda!');
  });

  it(`It only has the buttons "Por Ingredientes" and "Me Surpreenda!!" to the drink
  explore screen`, async () => {
    renderWithRouterAndStore(<App />, { route: '/explorar/bebidas' });

    const exploreByIngredient = await screen.findByTestId('explore-by-ingredient');
    const exploreByArea = screen.queryByTestId('explore-by-area');
    const exploreBySurprise = await screen.findByTestId('explore-surprise');

    expect(exploreByIngredient).toHaveTextContent('Por Ingredientes');
    expect(exploreByArea).not.toBeInTheDocument();
    expect(exploreBySurprise).toHaveTextContent('Me Surpreenda!');
  });
});
