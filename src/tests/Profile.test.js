import React from 'react';
import { queryByTestId } from '@testing-library/react';
import Profile from '../pages/Profile';

import { renderWithRouterAndStore } from './helper/testConfig';

describe('The screen profile should have right icon from the Header', () => {
  it('Should have the profile button and title', () => {
    renderWithRouterAndStore(<Profile />);
    expect(queryByTestId(document.documentElement, 'profile-top-btn'))
      .toBeInTheDocument();
    expect(queryByTestId(document.documentElement, 'page-title'))
      .toBeInTheDocument();
  });

  it('Shouldnt have search button', () => {
    renderWithRouterAndStore(<Profile />);
    expect(queryByTestId(document.documentElement, 'search-top-btn'))
      .not.toBeInTheDocument();
  });
});
