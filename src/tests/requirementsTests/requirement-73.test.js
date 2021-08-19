import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import App from '../../App';

describe(`73 - Redirect the user by clicking on "Por Local de Origem", the route should
change to the explore by place of origin screen`, () => {
  it('The route should change to explore by place of origin screen', async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/explorar/comidas' });

    const exploreByArea = await screen.findByTestId('explore-by-area');
    fireEvent.click(exploreByArea);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/explorar/comidas/area');
  });
});
