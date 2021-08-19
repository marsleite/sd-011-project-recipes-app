// import userEvent from '@testing-library/user-event';
import React from 'react';
import ReceitasFeitas from '../pages/ReceitasFeitas';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testa a pagina Receitas Feitass ', () => {
  test('testa se a rota está correta', async () => {
    const { history } = renderWithRouterAndRedux(<ReceitasFeitas />);
    history.push('/receitas-feitas');
  });
  test('testa se a página contém o título "Receitas Feitas"', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  it('testa se a página contém o botão Profile', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const profileBtn = getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });
  test('testa se a página contém o botão "All" ', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const btnAll = getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();
  });
  test('testa se a página contém o botão "Food" ', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const btnFood = getByTestId('filter-by-food-btn');
    expect(btnFood).toBeInTheDocument();
  });
  test('testa se a página contém o botão "Drink" ', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const btnDrink = getByTestId('filter-by-drink-btn');
    expect(btnDrink).toBeInTheDocument();
  });
  test('testa se as imagens são renderizadas ', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const foodImage = getByTestId('0-horizontal-image');
    expect(foodImage).toBeInTheDocument();
    const drinkImage = getByTestId('1-horizontal-image');
    expect(drinkImage).toBeInTheDocument();
  });
  test('testa se é renderizada as informações da receita', () => {
    const { getByTestId, getByText } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const foodInfo = getByTestId('0-horizontal-top-text');
    expect(getByText('Italian - Vegetarian')).toBeInTheDocument();
    expect(foodInfo).toBeInTheDocument();
    const drinkInfo = getByTestId('1-horizontal-top-text');
    expect(drinkInfo).toBeInTheDocument();
    expect(getByText('Alcoholic')).toBeInTheDocument();
  });
  test('testa se o nome da receita é renderizado', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const foodName = getByTestId('0-horizontal-name');
    expect(foodName).toBeInTheDocument();
    const drinkName = getByTestId('1-horizontal-name');
    expect(drinkName).toBeInTheDocument();
  });
  test('testa se o botão de compartilhar é renderizado', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const foodShare = getByTestId('0-horizontal-share-btn');
    expect(foodShare).toBeInTheDocument();
    const drinkShare = getByTestId('1-horizontal-share-btn');
    expect(drinkShare).toBeInTheDocument();
  });
  test('testa se a data da receita é renderizado', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const foodDate = getByTestId('0-horizontal-done-date');
    expect(foodDate).toBeInTheDocument();
    const drinkDate = getByTestId('1-horizontal-done-date');
    expect(drinkDate).toBeInTheDocument();
  });
  test('testa se as tags da receita de comida é renderizada', () => {
    const { getByTestId } = renderWithRouterAndRedux(<ReceitasFeitas />);
    const pastaTag = getByTestId('0-Pasta-horizontal-tag');
    expect(pastaTag).toBeInTheDocument();
    const curryTag = getByTestId('0-Curry-horizontal-tag');
    expect(curryTag).toBeInTheDocument();
  });
});
