import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`67 - Implement the explore screen elements respecting the attributes described
in the prototype`, () => {
  it('It has the explore-food and explore-drinks data-testids',
    async () => {
      renderWithRouterAndStore(<App />, { route: '/explorar' });

      const exploreFood = await screen.findByTestId('explore-food');
      const exploreDrinks = await screen.findByTestId('explore-drinks');

      expect(exploreFood).toBeInTheDocument();
      expect(exploreDrinks).toBeInTheDocument();
    });
});
