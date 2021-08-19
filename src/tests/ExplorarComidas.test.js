import userEvent from '@testing-library/user-event';
import React from 'react';
import ExplorarComidas from '../pages/ExplorarComidas';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('testa a pagina Explorar Comidas ', () => {
  test('testa se a rota está correta', async () => {
    const { history } = renderWithRouterAndRedux(<ExplorarComidas />);
    history.push('/explorar/comidas');
  });
  test('testa se a página contém o título "Explorar Comidas"', async () => {
    const { findByTestId } = renderWithRouterAndRedux(<ExplorarComidas />);
    const title = await findByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  test('testa se clicando no botão "Por Ingredientes" é redirecionado'
  + 'para explorar/comidas/ingredientes', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<ExplorarComidas />);
    const exploreIngredient = await findByTestId('explore-by-ingredient');
    userEvent.click(exploreIngredient);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/ingredientes');
  });
  test('testa se clicando no botão "Por Local de Origem" é redirecionado'
  + 'para explorar/comidas/area', async () => {
    const { history, findByTestId } = renderWithRouterAndRedux(<ExplorarComidas />);
    const exploreArea = await findByTestId('explore-by-area');
    userEvent.click(exploreArea);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/area');
  });
  test('testa se clicando no botão "Me Surpreenda" é redirecionado '
  + ' para explorar/comidas/id', async () => {
    const { findByTestId } = renderWithRouterAndRedux(<ExplorarComidas />);
    const meals = {
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strDrinkAlternate: null,
      strCategory: 'Vegetarian',
      strArea: 'Italian',
      strInstructions: 'Bring a large pot of water to a boil. Add kosher salt'
        + 'to the boiling water, then add the pasta. Cook according to the package'
        + 'instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat,'
        + 'add the olive oil and heat until the oil starts to shimmer. Add the garlic'
        + 'and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes,'
        + 'red chile flakes, Italian seasoning and salt and pepper to taste. Bring to'
        + 'a boil and cook for 5 minutes. Remove from the heat and add the chopped'
        + 'basil.\r\nDrain the pasta and add it to the sauce. Garnish with'
        + 'Parmigiano-Reggiano flakes and more basil and serve warm.',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      strTags: 'Pasta,Curry',
      strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
      strIngredient1: 'penne rigate',
      strIngredient2: 'olive oil',
      strIngredient3: 'garlic',
      strIngredient4: 'chopped tomatoes',
      strIngredient5: 'red chile flakes',
      strIngredient6: 'italian seasoning',
      strIngredient7: 'basil',
      strIngredient8: 'Parmigiano-Reggiano',
      strMeasure1: '1 pound',
      strMeasure2: '1/4 cup',
      strMeasure3: '3 cloves',
      strMeasure4: '1 tin ',
      strMeasure5: '1/2 teaspoon',
      strMeasure6: '1/2 teaspoon',
      strMeasure7: '6 leaves',
      strMeasure8: 'spinkling',
    };

    const exploreSurprise = await findByTestId('explore-surprise');
    userEvent.click(exploreSurprise);
    const { idMeal } = meals;
    const path = `/explorar/comidas/${idMeal}`;
    expect(path).toBe('/explorar/comidas/52771');
  });
});
