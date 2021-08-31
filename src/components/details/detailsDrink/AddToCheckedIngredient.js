export default function addToCheckedIngredient(ingredient, index, stateParams) {
  const { checkedNumberIngredients,
    setCheckedNumberIngredients,
    checkedIngredients,
    setCheckedIngredients,
    urlID,
    recipeType } = stateParams;

  const test = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (checkedIngredients.includes(ingredient)) {
    const arrayCheckedIngredients = checkedIngredients.filter((ingredient1) => (
      ingredient1 !== ingredient));
    setCheckedIngredients(arrayCheckedIngredients);
    const indexIngredient = checkedNumberIngredients.filter((ingredientIndex) => (
      ingredientIndex !== Number(index)));
    setCheckedNumberIngredients(indexIngredient);
    test[recipeType][urlID] = indexIngredient;
    localStorage.setItem('inProgressRecipes', JSON.stringify(test));
  } else {
    setCheckedIngredients([...checkedIngredients, ingredient]);
    const number = [...checkedNumberIngredients, Number(index)];
    setCheckedNumberIngredients(number);
    test[recipeType][urlID] = number;
    localStorage.setItem('inProgressRecipes', JSON.stringify(test));
  }
}
