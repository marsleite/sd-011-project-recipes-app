import { screen } from '@testing-library/react';

export const testMealsRecipeCard = async (menu, maxCards, cardTestId, titleTestId) => {
  const reduceToMaxCards = menu.slice(0, maxCards);
  await Promise.all(
    reduceToMaxCards.map(async ({ idMeal, strMeal, strMealThumb }, index) => {
      const foodCard = await screen.findByTestId(`${index}${cardTestId}`);
      const foodCardImg = await screen.findByTestId(`${index}-card-img`);
      const foodCardName = await screen.findByTestId(`${index}${titleTestId}`);

      expect(foodCard).toBeInTheDocument();
      expect(foodCard).toHaveAttribute('href', `/comidas/${idMeal}`);
      expect(foodCardImg).toHaveAttribute('src', strMealThumb);
      expect(foodCardName).toHaveTextContent(strMeal);
    }),
  );
};

export const testDrinksRecipeCard = async (menu, maxCards, cardTestId, titleTestId) => {
  const reduceToMaxCards = menu.slice(0, maxCards);
  await Promise.all(
    reduceToMaxCards.map(async ({ idDrink, strDrink, strDrinkThumb }, index) => {
      const drinkCard = await screen.findByTestId(`${index}${cardTestId}`);
      const drinkCardImg = await screen.findByTestId(`${index}-card-img`);
      const drinkCardName = await screen.findByTestId(`${index}${titleTestId}`);

      expect(drinkCard).toBeInTheDocument();
      expect(drinkCard).toHaveAttribute('href', `/bebidas/${idDrink}`);
      expect(drinkCardImg).toHaveAttribute('src', strDrinkThumb);
      expect(drinkCardName).toHaveTextContent(strDrink);
    }),
  );
};
