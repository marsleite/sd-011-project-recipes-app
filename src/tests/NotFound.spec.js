import { renderWithRouterAndBothContext } from './helpers/renders';
import clearAndSetLsTests from './helpers/clearAndSetLSTests';
import servicesMocked from './mocks/servicesMocked';

describe('Testando DrinkRecipesInProgress', () => {
  beforeEach(() => {
    clearAndSetLsTests();
    servicesMocked();
  });

  it('Finaliza receita', async () => {
    const {
      getByText,
    } = renderWithRouterAndBothContext('/not-found');
    const notFound = getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
