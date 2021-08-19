const handleChange = (
  { target },
  {
    addProgressDone,
    id,
    ingredients,
    recipeType,
    resetProgress,
  },
) => {
  const { checked } = target;
  let index = target.getAttribute('index');
  index = parseInt(index, 10);
  const inProgressRecipes = JSON.parse(localStorage.inProgressRecipes);
  if (inProgressRecipes[recipeType][id].length > 0) {
    if (inProgressRecipes[recipeType][id].includes(index)) {
      if (checked === false) {
        if (inProgressRecipes[recipeType][id].length === ingredients.length) {
          resetProgress();
        }
        const currentIndex = inProgressRecipes[recipeType][id].findIndex((element) => (
          element === index));
        inProgressRecipes[recipeType][id].splice(currentIndex, 1);
      } else if (checked) {
        inProgressRecipes[recipeType][id].push(index);
      }
    } else if (checked) {
      inProgressRecipes[recipeType][id].push(index);
    }
  } else if (checked) {
    inProgressRecipes[recipeType][id].push(index);
  }
  if (inProgressRecipes[recipeType][id].length === ingredients.length) {
    addProgressDone();
  }
  localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
};

export default handleChange;
