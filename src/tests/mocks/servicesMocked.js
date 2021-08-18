// import cocktailDrinks from './cocktailDrinks';
// import drinkIngredients from './drinkIngredients';
// import drinkCategories from './drinkCategories';
// import oneDrink from './oneDrink';
import drinksByIngredient from './drinksByIngredient';
import cocoaDrinks from './cocoaDrinks';
import drinks from './drinks';
// import areas from './areas';
import beefMeals from './beefMeals';
// import italianMeals from './italianMeals';
// import japaneseMeals from './japaneseMeals';
// import mealCategories from './mealCategories';
// import mealIngredients from './mealIngredients';
import meals from './meals';
import mealsByIngredient from './mealsByIngredient';
// import oneMeal from './oneMeal';

function mealsAPIMocked() {
  jest.mock('../../services/theMealAPI', () => {
    // const areasMocked = areas;
    const beefMealsMocked = beefMeals;
    // const italianMealsMocked = italianMeals;
    // const japaneseMealsMocked = japaneseMeals;
    // const mealCategoriesMocked = mealCategories;
    // const mealIngredientsMocked = mealIngredients;
    const mealsMocked = meals;
    const mealsByIngredientMocked = mealByIngredient;
    // const oneMealMocked = oneMeal;

    const searchBarFetchMealMocked = (type) => {
      switch (type) {
      case 'ingredient':
        return mealsByIngredientMocked;
      case 'name':
        return beefMealsMocked;
      case 'firstLetter':
        return mealsMocked;
      default:
        break;
      }
    };

    return {
      searchBarFetchMeal: jest.fn((type) => searchBarFetchMealMocked(type)),
      // getMealDetail: jest.fn(() => oneMeal),
      // getInitialMealsRecipes: jest.fn(() => meals),
      // getMealsCategoryList: jest.fn(() => mealCategories),
      // getMealsByCategory: jest.fn(() => japaneseMeals),
      // getMealRecomendations: jest.fn(() => meals),
      // getRandomMeal: jest.fn(() => oneMeal[0].idMeal),
      // getMealsIngredients: jest.fn(() => mealIngredients),
      // getMealsArea: jest.fn(() => areas),
      // getMealsByArea: jest.fn(() => italianMeals),
    };
  });
}

export default function servicesMocked() {
  const searchBarFetchCockTailMocked = (type) => {
    switch (type) {
    case 'ingredient':
      return drinksByIngredient;
    case 'name':
      return cocoaDrinks;
    case 'firstLetter':
      return drinks;
    default:
      break;
    }
  };
  
  jest.mock('../../services/theCockTailAPI', () => ({
    searchBarFetchCockTail: jest.fn((type) => searchBarFetchCockTailMocked(type)),
    // getDrinkDetail: jest.fn(() => oneDrink),
    // getInitialDrinksRecipes: jest.fn(() => drinks),
    // getDrinksCategoryList: jest.fn(() => drinkCategories),
    // getDrinksByCategory: jest.fn(() => cocktailDrinks),
    // getDrinkRecomendations: jest.fn(() => drinks),
    // getRandomDrink: jest.fn(() => oneDrink[0].idDrink),
    // getDrinksIngredients: jest.fn(() => drinkIngredients),
  }));
}
