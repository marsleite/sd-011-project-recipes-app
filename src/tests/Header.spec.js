import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndBothContext } from './helpers/renders';
import clearAndSetLsTests from './helpers/clearAndSetLSTests';
import servicesMocked from './mocks/servicesMocked';

const PROFILE_TOP_BTN = 'profile-top-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Testando Componente Header', () => {
  beforeEach(() => {
    clearAndSetLsTests();
    servicesMocked();
  });

  it('1 - Testando link para perfil', () => {
    const {
      getByTestId,
      pathname,
    } = renderWithRouterAndBothContext('/receitas-feitas');
    const profileButton = getByTestId(PROFILE_TOP_BTN);
    expect(profileButton).toBeInTheDocument();
    fireEvent.click(profileButton);
    expect(pathname()).toBe('/perfil');
  });

  it('1 - Testando botão para search bar', () => {
    const {
      getByTestId,
      pathname,
    } = renderWithRouterAndBothContext('/comidas');
    const searchButton = getByTestId(SEARCH_TOP_BTN);
    const searchInput = getByTestId(SEARCH_INPUT);
    expect(searchButton).toBeInTheDocument();
    expect(searchInput).not.toBeInTheDocument();
    fireEvent.click(searchButton);
    expect(searchInput).toBeInTheDocument();
  });
});
