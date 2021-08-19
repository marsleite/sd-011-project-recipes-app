import { fireEvent, waitFor } from '@testing-library/react';
import MutationObserver from '@sheerun/mutationobserver-shim';
import { renderWithRouterAndBothContext } from './helpers/renders';
import clearAndSetLsTests from './helpers/clearAndSetLSTests';
import servicesMocked from './mocks/servicesMocked';

window.MutationObserver = MutationObserver;
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

  it('2 - Testando botão para search bar', async () => {
    const {
      getByTestId,
      pathname
    } = renderWithRouterAndBothContext('/comidas');
    await waitFor(() => {
      const searchButton = getByTestId(SEARCH_TOP_BTN);
      expect(searchButton).toBeInTheDocument();
      fireEvent.click(searchButton);
    });
    const searchInput = getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
  });
});
