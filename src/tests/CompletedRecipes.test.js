import React from 'react';
import { queryByTestId } from '@testing-library/react';
import CompletedRecipes from '../pages/CompletedRecipes';

import { renderWithRouterAndStore } from './helper/testConfig';

describe('The screen CompletedRecipes should have right icon from the Header', () => {
  it('Should have the profile button and title', () => {
    renderWithRouterAndStore(<CompletedRecipes />);
    expect(queryByTestId(document.documentElement, 'profile-top-btn'))
      .toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'page-title'))
      .toBeInTheDocument();
  });

  it('Shouldnt have search button', () => {
    renderWithRouterAndStore(<CompletedRecipes />);
    expect(queryByTestId(document.documentElement, 'search-top-btn'))
      .not.toBeInTheDocument();
  });
});
