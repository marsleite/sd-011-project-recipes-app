import userEvent from '@testing-library/user-event';
import React from 'react';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';
import favorite from './favoriteMock';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testa a pagina Receitas Favoritas ', () => {
  beforeAll(() => localStorage.setItem('favoriteRecipes', JSON.stringify(favorite)));
  test('testa se a rota está correta', async () => {
    const { history } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    history.push('/receitas-favoritas');
  });
  test('testa se a página contém o título "Receitas Favoritas"', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  it('testa se a página contém o botão Profile', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const profileBtn = getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });
  test('testa se a página contém o botão "All" ', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const btnAll = getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();
  });
  test('testa se a página contém o botão "Food" ', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const btnFood = getByTestId('filter-by-food-btn');
    expect(btnFood).toBeInTheDocument();
  });
  test('testa se a página contém o botão "Drink" ', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const btnDrink = getByTestId('filter-by-drink-btn');
    expect(btnDrink).toBeInTheDocument();
  });
  test('testa se as imagens são renderizadas ', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const foodImage = getByTestId('0-horizontal-image');
    expect(foodImage).toBeInTheDocument();
    const drinkImage = getByTestId('1-horizontal-image');
    expect(drinkImage).toBeInTheDocument();
  });
  it('testa se é renderizada as informações da receita', () => {
    const { getByTestId, getByText } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const foodInfo = getByTestId('0-horizontal-top-text');
    expect(getByText('Italian - Vegetarian')).toBeInTheDocument();
    expect(foodInfo).toBeInTheDocument();
    const drinkInfo = getByTestId('1-horizontal-top-text');
    expect(drinkInfo).toBeInTheDocument();
    expect(getByText('Alcoholic')).toBeInTheDocument();
  });
  it('testa se o botão de compartilhar é renderizado', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const foodShare = getByTestId('0-horizontal-share-btn');
    expect(foodShare).toBeInTheDocument();
    const drinkShare = getByTestId('1-horizontal-share-btn');
    expect(drinkShare).toBeInTheDocument();
  });
  it('testa se o botão de favoritos é renderizado', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const foodFavorite = getByTestId('0-horizontal-favorite-btn');
    expect(foodFavorite).toBeInTheDocument();
    const drinkFavorite = getByTestId('1-horizontal-favorite-btn');
    expect(drinkFavorite).toBeInTheDocument();
  });
  it('testa se quando a imagem da receita é clicada, a pagina é redirecionada', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const foodImage = getByTestId('0-horizontal-image');
    userEvent.click(foodImage);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771');
  });
  it('testa se quando o nome da receita é clicada, a pagina é redirecionada', () => {
    const { getByText, history } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const drinkName = getByText('Aquamarine');
    userEvent.click(drinkName);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/178319');
  });
});
