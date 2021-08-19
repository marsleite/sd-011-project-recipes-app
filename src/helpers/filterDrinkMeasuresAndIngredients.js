const filterDrinkMeasuresAndIngredients = (drinkDetails) => {
  const oldIngredients = [
    drinkDetails.strIngredient1,
    drinkDetails.strIngredient2,
    drinkDetails.strIngredient3,
    drinkDetails.strIngredient4,
    drinkDetails.strIngredient5,
    drinkDetails.strIngredient6,
    drinkDetails.strIngredient7,
    drinkDetails.strIngredient8,
    drinkDetails.strIngredient9,
    drinkDetails.strIngredient10,
    drinkDetails.strIngredient11,
    drinkDetails.strIngredient12,
    drinkDetails.strIngredient13,
    drinkDetails.strIngredient14,
    drinkDetails.strIngredient15,
  ];
  const oldMeasures = [
    drinkDetails.strMeasure1,
    drinkDetails.strMeasure2,
    drinkDetails.strMeasure3,
    drinkDetails.strMeasure4,
    drinkDetails.strMeasure5,
    drinkDetails.strMeasure6,
    drinkDetails.strMeasure7,
    drinkDetails.strMeasure8,
    drinkDetails.strMeasure9,
    drinkDetails.strMeasure10,
    drinkDetails.strMeasure11,
    drinkDetails.strMeasure12,
    drinkDetails.strMeasure13,
    drinkDetails.strMeasure14,
    drinkDetails.strMeasure15,
  ];
  const newIngredients = oldIngredients.filter(
    (ingredient) => ingredient !== null && ingredient !== '',
  );
  const newMeasures = oldMeasures.filter(
    (measure) => measure !== null && measure !== '',
  );
  const measuresAndIngredients = newIngredients.map((element, index) => {
    if (newMeasures[index] === undefined) return element;
    return `${newMeasures[index]} - ${element}`;
  });
  return measuresAndIngredients;
};

export default filterDrinkMeasuresAndIngredients;
