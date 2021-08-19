import userEvent from '@testing-library/user-event';
import React from 'react';
import ComidasArea from '../pages/ComidasArea';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const btnSelect = 'explore-by-area-dropdown';

describe('testa a pagina ComidasArea ', () => {
  test('testa se a rota está correta', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<ComidasArea />);
    history.push('/explorar/comidas/area');

    const btnDropDown = await findByTestId(btnSelect);
    userEvent.click(btnDropDown);
    const path = history.location.pathname;

    expect(path).toBe('/explorar/comidas/area');
  });
  test('testa se página contém o título "Explorar Origem" ', async () => {
    const { findByText } = renderWithRouterAndRedux(<ComidasArea />);

    const title = await findByText(/Explorar Origem/i);
    expect(title).toBeInTheDocument();
  });
  test('testa se página contém um dropdown', async () => {
    const { findByTestId } = renderWithRouterAndRedux(<ComidasArea />);
    const dropDown = await findByTestId(btnSelect);
    expect(dropDown).toBeInTheDocument('explore-by-area-dropdown');
  });
  test('testa se o dropdown contém as opções de países', async () => {
    const { findByTestId } = renderWithRouterAndRedux(<ComidasArea />);
    const americanOption = await findByTestId('American-option');
    expect(americanOption).toBeInTheDocument();
    const britishOption = await findByTestId('British-option');
    expect(britishOption).toBeInTheDocument();
    const turkishOption = await findByTestId('Turkish-option');
    expect(turkishOption).toBeInTheDocument();
    const vietnameseOption = await findByTestId('Vietnamese-option');
    expect(vietnameseOption).toBeInTheDocument();
  });
  test('testa se clicando no mome da comida, é redirecionada para comidas/id',
    async () => {
      const { history, findByText } = renderWithRouterAndRedux(<ComidasArea />);
      const corbaCard = await findByText(/Corba/i);
      userEvent.click(corbaCard);
      const path = history.location.pathname;
      expect(path).toBe('/comidas/52977');
    });
  test('testa se clicando na imagem da comida, é redirecionada para comidas/id',
    async () => {
      const { history, findByAltText } = renderWithRouterAndRedux(<ComidasArea />);
      const corbaCard = await findByAltText(/Corba/i);
      userEvent.click(corbaCard);
      const path = history.location.pathname;
      expect(path).toBe('/comidas/52977');
    });
});
