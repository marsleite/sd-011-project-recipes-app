import { useState, useEffect } from 'react';

const useRecipeStatus = (id, url) => {
  const [recipeProgress, setRecipeProgress] = useState('Iniciar Receita');
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes) {
      return setShowBtn(true);
    }

    if (doneRecipes && doneRecipes.some((recipe) => recipe.id === id)) {
      return setShowBtn(false);
    }
  }, [id]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes) {
      const { cocktails, meals } = inProgressRecipes;
      if (url.includes('bebidas') && cocktails && cocktails[id]) {
        setRecipeProgress('Continuar Receita');
      }

      if (url.includes('comidas') && meals && meals[id]) {
        setRecipeProgress('Continuar Receita');
      }
    }
  }, [id, url]);

  return {
    recipeProgress,
    showBtn,
  };
};

export default useRecipeStatus;
