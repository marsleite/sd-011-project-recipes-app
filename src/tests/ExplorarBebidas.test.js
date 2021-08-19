import userEvent from '@testing-library/user-event';
import React from 'react';
import ExplorarBebidas from '../pages/ExplorarBebidas';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testa a pagina Explorar Bebidas ', () => {
  test('testa se a rota está correta', async () => {
    const { history } = renderWithRouterAndRedux(<ExplorarBebidas />);
    history.push('/explorar/bebidas');
  });
  test('testa se a página contém o título "Explorar Bebidas"', async () => {
    const { findByTestId } = renderWithRouterAndRedux(<ExplorarBebidas />);
    const title = await findByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('testa se clicando no botão "Por Ingredientes" é redirecionado'
  + 'para explorar/bebidas/ingredientes', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<ExplorarBebidas />);
    const exploreIngredient = await findByTestId('explore-by-ingredient');
    userEvent.click(exploreIngredient);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/bebidas/ingredientes');
  });
  test('testa se clicando no botão "Me Surpreenda" é redirecionado '
  + ' para explorar/bebidas/id', async () => {
    const { findByTestId } = renderWithRouterAndRedux(<ExplorarBebidas />);
    const drink = {
      idDrink: '178319',
      strDrink: 'Aquamarine',
      strCategory: 'Cocktail',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Martini Glass',
      strInstructions: 'Shake well in a shaker with ice.\r\nStrain in a martini glass.',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      strIngredient1: 'Hpnotiq',
      strIngredient2: 'Pineapple Juice',
      strIngredient3: 'Banana Liqueur',
      strMeasure1: '2 oz',
      strMeasure2: '1 oz',
      strMeasure3: '1 oz',
      strCreativeCommonsConfirmed: 'No',
    };

    const exploreSurprise = await findByTestId('explore-surprise');
    userEvent.click(exploreSurprise);
    const { idDrink } = drink;
    const path = `/explorar/bebidas/${idDrink}`;
    expect(path).toBe('/explorar/bebidas/178319');
  });
});
