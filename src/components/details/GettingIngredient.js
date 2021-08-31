function conditionFor(idx, recipeId) { // função para não deixar ser iteravel no for quando ingrediente for nulo
  return !!recipeId[`strIngredient${idx}`];
}

export default function gettingIngredients(recipeId) {
  const list = [];
  for (let index = 1; conditionFor(index, recipeId); index += 1) { // depois tentar fazer com filter, mas tem que tranformar as chaves e valores em objetos
    list.push(`${recipeId[`strIngredient${index}`]} - ${recipeId[`strMeasure${index}`]}`); // cria um nova array com ingrediente e quantidade respectivamente
  }
  return list;
}
